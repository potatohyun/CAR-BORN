import axios from "axios";
import { CARBORN_SITE } from "./../../../lib/api";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { BuyDeleteWarningModal } from "../ModalComponent/BuyDeleteWarningModal";

import { Pagination, Table, TableCell, TableRow } from "@mui/material";
import {
  StyledTableContainer,
  StyledTableHead,
  StyleMainTableHead,
} from "../DetailComponent/MyCarInfoDetail";
import { StyledButton, StyledPagination } from "./MyCarInfoPagination";

export interface BuySellContentPaginationProps {
  itemsPerPage: number;
}

export interface BuyContentType {
  id:number;
  carSaleCarMaker: string;
  carSaleCarModelNm: string;
  carSaleCarModelYear: string;
  carSaleCarRegNm: string;
  carSaleCarMileage: number;
  carSalePrice: number;
  bookStatus: number;
  uptDt: string;
  // purchaseDate: string;
  // purchaseStatus: string;
  // seller: string;
}

const StyleBuyContentPaginationDiv = styled.div`
  width: 100vw;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BuyContentPagination = ({
  itemsPerPage,
}: BuySellContentPaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [buyData, setBuyData] = useState<BuyContentType[]>([]);
  const [totalPageCnt, setTotalPageCnt] = useState(0);

  const [isDeleteBuyModal, setIsDeleteBuyModal] = useState(false);
  const [isDeleteBuyId, setIsDeleteBuyId] = useState(0);

  const handleRequestBuyData = async (page: number, count: number) => {
    try {
      const response = await axios.get(
        `${CARBORN_SITE}/api/user/car/buy/list/${page}/${count}`
      );
      setTotalPageCnt(response.data.message.totalPages);

      const modifiedContent = response.data.message.content.map(
        (content: any) => {
          let modifiedBookStatus = "";
          let modifiedBookStatusNum = 0;
          switch (content.bookStatus) {
            case 0:
              modifiedBookStatus = "예약 중";
              modifiedBookStatusNum = 0;
              break;
            case 1:
              modifiedBookStatus = "구매 완료";
              modifiedBookStatusNum = 1;
              break;
            case 2:
              modifiedBookStatus = "구매 취소";
              modifiedBookStatusNum = 2;
              break;
            default:
              modifiedBookStatus = content.bookStatus;
              modifiedBookStatusNum = 0;
              break;
          }

          return {
            ...content,
            bookStatus: modifiedBookStatus,
            modifiedBookStatusNum,
          };
        }
      );

      setBuyData(modifiedContent);
      setCurrentPage(page);
    } catch (error) {
      console.error(error);
    }
  };

  const ObjString: string | null = localStorage.getItem("login-token");
  const Obj = ObjString ? JSON.parse(ObjString) : null;
  const totalPages = totalPageCnt;

  useEffect(() => {
    handleRequestBuyData(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  if (buyData.length === 0) {
    return <div>No data Found!</div>;
  }

  const handleBuyData = (id: number) => {
    setIsDeleteBuyModal(true);
    setIsDeleteBuyId(id);
  };

  // 모달창 닫을 때
  const handleCloseModal = () => {
    setIsDeleteBuyModal(false);
  };

  return (
    <StyleBuyContentPaginationDiv>
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
              <TableCell>구매 예약 신청일</TableCell>
              <TableCell>구매상태</TableCell>
              <TableCell>예약상태</TableCell>
            </TableRow>
          </StyledTableHead>
          <StyleMainTableHead>
            {buyData.map((buy: BuyContentType, index: number) => (
              <TableRow key={index}>
                <TableCell>{buy.carSaleCarModelNm}</TableCell>
                <TableCell>{buy.carSaleCarMaker}</TableCell>
                <TableCell>{buy.carSaleCarRegNm}</TableCell>
                <TableCell>{buy.carSaleCarModelYear}</TableCell>
                <TableCell>{buy.carSaleCarMileage}</TableCell>
                <TableCell>{buy.carSalePrice}</TableCell>
                <TableCell>{buy.uptDt}</TableCell>
                <TableCell>{buy.bookStatus}</TableCell>
                <TableCell>
                  <StyledButton onClick={() => handleBuyData(buy.id)}>
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
            handleRequestBuyData(value, itemsPerPage)
          }
          color="primary"
          size="large"
          disabled={totalPages === 0}
        />
      </StyledPagination>
      {isDeleteBuyModal && (
        <BuyDeleteWarningModal
          message="구매예약을 취소하시겠습니까?"
          onClose={handleCloseModal}
          bookid={isDeleteBuyId}
        />
      )}
    </StyleBuyContentPaginationDiv>
  );
};

export default BuyContentPagination;
