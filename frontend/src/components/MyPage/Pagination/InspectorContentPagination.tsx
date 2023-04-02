import axios from "axios";
import { CARBORN_SITE } from "./../../../lib/api";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

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

// 일반적인 CSS
const StyleInspectorPaginationDiv = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .MuiStack-root {
    position: absolute;
    top: 135vh;
  }

  .MuiButtonBase-root {
    background-color: white;
  }

  .Mui-selected {
    background-color: #d23131 !important;
    color: white;
  }
`;

// 여기부터는 일반적인 타입 지정
export interface InspectorContentPaginationProps {
  itemsPerPage: number;
}

export interface Car {
  id: number;
  carModelNm: string;
  manufacturer: string;
  carMileage: number;
  carRegNm: string;
  carModelYear: string;
  price: number;
  bookDt: string;
  lastMaintenanceDate: string;
  bookStatus: string;
  inspectorAccountName: string;
  modifiedBookStatusNum: number;
}

const InspectorContentPagination = ({
  itemsPerPage,
}: InspectorContentPaginationProps) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [inspectorData, setInspectorData] = useState<Car[]>([]);
  const [totalPageCnt, setTotalPageCnt] = useState(0);

  const handleRequestInspectorData = async (page: number, count: number) => {
    try {
      const response = await axios.get(
        `${CARBORN_SITE}/api/user/inspect/book/list/${page}/${count}`
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
              modifiedBookStatus = "검수 완료";
              modifiedBookStatusNum = 1;
              break;
            case 2:
              modifiedBookStatus = "검수 취소";
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

      setInspectorData(modifiedContent);
      setCurrentPage(page);
    } catch (error) {
      console.error(error);
    }
  };

  const ObjString: string | null = localStorage.getItem("login-token");
  const Obj = ObjString ? JSON.parse(ObjString) : null;
  const totalPages = totalPageCnt;

  useEffect(() => {
    handleRequestInspectorData(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  if (inspectorData.length === 0) {
    return <div>No data Found!</div>;
  }

  const getInspectorBookDetail = (carId: number) => {
    if (Obj.userId) {
      navigate(`/${Obj.userId}/mypage/inspector/${carId}/bookdetail`);
    }
  };

  const getInspectorDetail = (resultId: number) => {
    if (Obj.userId) {
      navigate(`/${Obj.userId}/mypage/inspector/${resultId}/completedetail`, {
        state: inspectorData[resultId % 5],
      });
    }
  };

  return (
    <StyleInspectorPaginationDiv>
      <StyledTableContainer>
        <Table>
          <StyledTableHead>
            <TableRow>
              <TableCell>차량모델</TableCell>
              <TableCell>{`주행거리(km)`}</TableCell>
              <TableCell>차량번호</TableCell>
              <TableCell>{`연식(년)`}</TableCell>
              <TableCell>검수예약신청일</TableCell>
              <TableCell>검수상태</TableCell>
              <TableCell>검수업체</TableCell>
              <TableCell>예약상세조회</TableCell>
              <TableCell>완료상세조회</TableCell>
            </TableRow>
          </StyledTableHead>
          <StyleMainTableHead>
            {inspectorData.map((car: Car, index: number) => (
              <TableRow key={index}>
                <TableCell>{car.carModelNm}</TableCell>
                <TableCell>{car.carMileage}</TableCell>
                <TableCell>{car.carRegNm}</TableCell>
                <TableCell>{car.carModelYear}</TableCell>
                <TableCell>{car.bookDt === null ? "-" : car.bookDt}</TableCell>
                <TableCell>{car.bookStatus}</TableCell>
                <TableCell>{car.inspectorAccountName}</TableCell>
                <TableCell>
                  {car.modifiedBookStatusNum === 0 ? (
                    <StyledButton
                      onClick={() => getInspectorBookDetail(car.id)}
                    >
                      조회
                    </StyledButton>
                  ) : null}
                </TableCell>
                <TableCell>
                  {car.modifiedBookStatusNum === 1 ? (
                    <StyledButton onClick={() => getInspectorDetail(car.id)}>
                      조회
                    </StyledButton>
                  ) : null}
                </TableCell>
              </TableRow>
            ))}
          </StyleMainTableHead>
        </Table>
      </StyledTableContainer>
      <br />
      <Stack spacing={2}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(event, value) =>
            handleRequestInspectorData(value, itemsPerPage)
          }
          sx={{ backgroundColor: "white" }}
          size="large"
          disabled={totalPages === 0}
        />
      </Stack>
    </StyleInspectorPaginationDiv>
  );
};
export default InspectorContentPagination;
