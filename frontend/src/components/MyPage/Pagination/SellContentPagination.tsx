import axios from "axios";
import styled from "@emotion/styled";
import { useState } from "react";
import { BuySellContentPaginationProps } from "./BuyContentPagination";
import { CARBORN_SITE } from "./../../../lib/api";
import { useEffect } from "react";
import { SellDeleteWarningModal } from "../ModalComponent/SellDeleteWarningModal";

import { Pagination, Table, TableCell, TableRow } from "@mui/material";
import {
  StyledTableContainer,
  StyledTableHead,
  StyleMainTableHead,
} from "../DetailComponent/MyCarInfoDetail";
import { StyledButton, StyledPagination } from "./MyCarInfoPagination";

export interface SellContentType {
  id: number;
  carModelNm: string;
  carMaker: string;
  carRegNm: string;
  carModelYear: string;
  carMileage: number;
  price: number;
  regDt: null | string;
  completedDate: null | string;
  saleStatus: number;
  modifiedBookStatusNum?: number;
  // buyer: string;
}

const StyleSellContentPaginationDiv = styled.div`
  width: 100vw;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SellContentPagination = ({
  itemsPerPage,
}: BuySellContentPaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sellData, setSellData] = useState<SellContentType[]>([]);
  const [totalPageCnt, setTotalPageCnt] = useState(0);
  
  const [isDeleteSellModal, setIsDeleteSellModal] = useState(false);
  const [isDeleteSellId, setIsDeleteSellId] = useState(0);
  
  const handleRequestSellData = async (page: number, count: number) => {
    try {
      const response = await axios.get(
        `${CARBORN_SITE}/api/user/car/sell/list/${page}/${count}`
      );

      console.log(response)
      setTotalPageCnt(response.data.message.totalPages);

      const modifiedContent = response.data.message.content.map(
        (content: any) => {
          let modifiedBookStatus = "";
          let modifiedBookStatusNum = 0;
          switch (content.saleStatus) {
            case 0:
              modifiedBookStatus = "예약 중";
              modifiedBookStatusNum = 0;
              break;
            case 1:
              modifiedBookStatus = "판매 완료";
              modifiedBookStatusNum = 1;
              break;
            case 2:
              modifiedBookStatus = "판매 취소";
              modifiedBookStatusNum = 2;
              break;
            default:
              modifiedBookStatus = content.saleStatus;
              modifiedBookStatusNum = 0;
              break;
          }

          return {
            ...content,
            saleStatus: modifiedBookStatus,
            modifiedBookStatusNum,
          };
        }
      );

      setSellData(modifiedContent);
      setCurrentPage(page);
    } catch (error) {
      console.error(error);
    }
  };

  const ObjString: string | null = localStorage.getItem("login-token");
  const Obj = ObjString ? JSON.parse(ObjString) : null;
  const totalPages = totalPageCnt;
  
  console.log(sellData);

  useEffect(() => {
    handleRequestSellData(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  if (sellData.length === 0) {
    return <div>No data Found!</div>;
  }

  const handleSellData = (id: number) => {
    setIsDeleteSellModal(true);
    setIsDeleteSellId(id);
  };

  // 모달창 닫을 때
  const handleCloseModal = () => {
    setIsDeleteSellModal(false);
  };


  return (
    <StyleSellContentPaginationDiv>
      <StyledTableContainer>
        <Table>
          <StyledTableHead>
            <TableRow>
              <TableCell>차량모델</TableCell>
              <TableCell>제조사</TableCell>
              <TableCell>차량번호</TableCell>
              <TableCell>{`연식(년)`}</TableCell>
              <TableCell>{`주행거리(km)`}</TableCell>
              <TableCell>{`구매가(만원)`}</TableCell>
              <TableCell>판매 등록일</TableCell>
              <TableCell>판매상태</TableCell>
              <TableCell>예약상태</TableCell>
            </TableRow>
          </StyledTableHead>
          <StyleMainTableHead>
            {sellData.map((sell: SellContentType, index: number) => (
              <TableRow key={index}>
                <TableCell>{sell.carModelNm}</TableCell>
                <TableCell>{sell.carMaker}</TableCell>
                <TableCell>{sell.carRegNm}</TableCell>
                <TableCell>{sell.carModelYear}</TableCell>
                <TableCell>{sell.carMileage}</TableCell>
                <TableCell>{sell.price.toLocaleString()}</TableCell>
                <TableCell>{sell.regDt?.slice(0,10)}</TableCell>
                <TableCell>{sell.saleStatus}</TableCell>
                <TableCell>
                  <StyledButton onClick={() => handleSellData(sell.id)}>
                    취소하기
                  </StyledButton>
                </TableCell>
              </TableRow>
            ))}
          </StyleMainTableHead>
        </Table>
      </StyledTableContainer>
      <br />
      <StyledPagination>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(event, value) =>
            handleRequestSellData(value, itemsPerPage)
          }
          color="primary"
          size="large"
          disabled={totalPages === 0}
        />
      </StyledPagination>
      {isDeleteSellModal && (
        <SellDeleteWarningModal
          message="판매예약을 취소하시겠습니까?"
          onClose={handleCloseModal}
          bookid={isDeleteSellId}
        />
      )}
    </StyleSellContentPaginationDiv>
  );
};

export default SellContentPagination;
