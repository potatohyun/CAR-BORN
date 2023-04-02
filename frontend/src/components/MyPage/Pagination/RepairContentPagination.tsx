import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { CARBORN_SITE } from "./../../../lib/api";

//MUI 컴포넌트
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import { Table, TableCell, TableRow } from "@mui/material";
import {
  StyledTableContainer,
  StyledTableHead,
  StyleMainTableHead,
} from "../DetailComponent/MyCarInfoDetail";
import { StyledButton } from "./MyCarInfoPagination";

export interface RepairContentPaginationProps {
  itemsPerPage: number;
}

export interface RepairType {
  id: number;
  carModelNm: string;
  carMaker: string;
  carMileage: number;
  carRegNm: string;
  carModelYear: number;
  price: number;
  bookDt: string;
  lastMaintenanceDate: string;
  bookStatus: string;
  repairShopAccountName: string;
  modifiedBookStatusNum: number;
}

const StyleRepairPaginationDiv = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .MuiStack-root {
    position: absolute;
    top: 135vh
  }

  .MuiButtonBase-root {
    background-color: white;
  }

  .Mui-selected {
    background-color: #d23131 !important;
    color: white;
  }
`;

const RepairContentPagination = ({
  itemsPerPage,
}: RepairContentPaginationProps) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [repairData, setRepairData] = useState<RepairType[]>([]);
  const [totalPageCnt, setTotalPageCnt] = useState(0);

  const handleRequestRepairData = async (page: number, count: number) => {
    try {
      const response = await axios.get(
        `${CARBORN_SITE}/api/user/repair/book/list/${page}/${count}`
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
              modifiedBookStatus = "정비 완료";
              modifiedBookStatusNum = 1;
              break;
            case 2:
              modifiedBookStatus = "정비 취소";
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

      setRepairData(modifiedContent);
      setCurrentPage(page);
    } catch (error) {
      console.error(error);
    }
  };

  const ObjString: string | null = localStorage.getItem("login-token");
  const Obj = ObjString ? JSON.parse(ObjString) : null;
  const totalPages = totalPageCnt;

  useEffect(() => {
    handleRequestRepairData(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  if (repairData.length === 0) {
    return <div>No data Found!</div>;
  }

  const getRepairBookDetail = (bookId: number) => {
    if (Obj.userId) {
      navigate(`/${Obj.userId}/mypage/repair/${bookId}/bookdetail`);
    }
  };

  const getRepairDetail = (resultId: number) => {
    if (Obj.userId) {
      navigate(`/${Obj.userId}/mypage/repair/${resultId}/completedetail`, {
        state: repairData[resultId % 5],
      });
    }
  };

  return (
    <StyleRepairPaginationDiv>
      <StyledTableContainer>
        <Table>
          <StyledTableHead>
            <TableRow>
              <TableCell>차량모델</TableCell>
              <TableCell>제조사</TableCell>
              <TableCell>{`주행거리(km)`}</TableCell>
              <TableCell>차량번호</TableCell>
              <TableCell>{`연식(년)`}</TableCell>
              <TableCell>정비예약신청일</TableCell>
              <TableCell>정비상태</TableCell>
              <TableCell>정비업체</TableCell>
              <TableCell>예약상세조회</TableCell>
              <TableCell>완료상세조회</TableCell>
            </TableRow>
          </StyledTableHead>
          <StyleMainTableHead>
            {repairData.map((car: RepairType, index: number) => (
              <TableRow key={index}>
                <TableCell>{car.carModelNm}</TableCell>
                <TableCell>{car.carMaker}</TableCell>
                <TableCell>{car.carMileage}</TableCell>
                <TableCell>{car.carRegNm}</TableCell>
                <TableCell>{car.carModelYear}</TableCell>
                <TableCell>{car.bookDt === null ? "-" : car.bookDt}</TableCell>
                {/* <TableCell>
                  {car.lastMaintenanceDate === null
                    ? "-"
                    : car.lastMaintenanceDate}
                </TableCell> */}
                <TableCell>{car.bookStatus}</TableCell>
                <TableCell>{car.repairShopAccountName}</TableCell>
                {/* <TableCell>
                  {car.maintenanceCompany === null ? "-" : car.maintenanceCompany}
                </TableCell> */}
                <TableCell>
                  {car.modifiedBookStatusNum === 0 ? <StyledButton onClick={() => getRepairBookDetail(car.id)}>
                    조회
                  </StyledButton> : null}
                </TableCell>
                <TableCell>
                  {car.modifiedBookStatusNum === 1 ? <StyledButton onClick={() => getRepairDetail(car.id)}>
                    조회
                  </StyledButton> : null}
                </TableCell>
              </TableRow>
            ))}
          </StyleMainTableHead>
        </Table>
      </StyledTableContainer>
      <br/>
      <Stack spacing={2}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(event, value) =>
            handleRequestRepairData(value, itemsPerPage)
          }
          sx={{ backgroundColor: "white" }}
          size="large"
          disabled={totalPages === 0}
        />
      </Stack>
    </StyleRepairPaginationDiv>
  );
};

export default RepairContentPagination;
