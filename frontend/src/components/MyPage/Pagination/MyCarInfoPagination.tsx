//MUI 컴포넌트
import { Pagination } from "@mui/material";
import { Table, TableCell, TableRow } from "@mui/material";

import axios from "axios";
import { CARBORN_SITE } from "./../../../lib/api";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import {
  StyledTableContainer,
  StyledTableHead,
  StyleMainTableHead,
} from "../DetailComponent/MyCarInfoDetail";

export interface MyCarInfoPaginationProps {
  itemsPerPage: number;
}

export interface Car {
  id: number;
  modelNm: string;
  regNm: string;
  mileage: number;
  modelYear: number;
  maker: string;
  images: any;
}

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

export const StyledButton = styled.button`
  background-color: #d23131;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  outline: none;

  &:hover {
    background-color: #a51c1c;
  }
`;

export const StyledPagination = styled((props: any) => <Pagination {...props} />)`
  display: flex;
  justify-content: center;
  align-items: center;

  & .MuiPaginationItem-root.Mui-selected {
    background-color: #d23131;
    color: white;
  }
`;

const MyCarInfoPagination = ({ itemsPerPage }: MyCarInfoPaginationProps) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [myCarInfoData, setMyCarInfoData] = useState<Car[]>([]);
  const [totalPageCnt, setTotalPageCnt] = useState(0);

  const handleRequestMyCarInfoData = async (page: number, count: number) => {
    try {
      const response = await axios.get(
        `${CARBORN_SITE}/api/user/car/list/${page}/${count}`
      );
      setTotalPageCnt(response.data.message.totalPages);
      setMyCarInfoData(response.data.message.content);
      setCurrentPage(page);
    } catch (error) {
      console.error(error);
    }
  };

  const ObjString: string | null = localStorage.getItem("login-token");
  const Obj = ObjString ? JSON.parse(ObjString) : null;
  const totalPages = totalPageCnt;

  useEffect(() => {
    handleRequestMyCarInfoData(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  if (myCarInfoData.length === 0) {
    return <div>No data Found!</div>;
  }

  const getCarInfoDetail = (carId: number) => {
    if (Obj.userId) {
      navigate(`/${Obj.userId}/mypage/mycarinfo/${carId}/detail`);
    }
  };

  return (
    <div>
      <StyledTableContainer>
        <Table>
          <StyledTableHead>
            <TableRow>
              <TableCell>차량모델</TableCell>
              <TableCell>제조사</TableCell>
              <TableCell>차량번호</TableCell>
              <TableCell>{`주행거리(km)`}</TableCell>
              <TableCell>{`연식(년)`}</TableCell>
              <TableCell>상세조회</TableCell>
            </TableRow>
          </StyledTableHead>
          <StyleMainTableHead>
            {myCarInfoData.map((car: Car, index) => (
              // 클릭하면 해당 리스트 아이디랑 이미지 넘겨주기
              <TableRow key={index}>
                <TableCell>{car.modelNm}</TableCell>
                <TableCell>{car.maker}</TableCell>
                <TableCell>{car.regNm}</TableCell>
                <TableCell>{car.mileage}</TableCell>
                <TableCell>{car.modelYear}</TableCell>
                <TableCell>
                  <StyledButton onClick={() => getCarInfoDetail(car.id)}>
                    조회
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
            handleRequestMyCarInfoData(value, itemsPerPage)
          }
          color="primary"
          size="large"
          disabled={totalPages === 0}
        />
      </StyledPagination>
    </div>
  );
};

export default MyCarInfoPagination;
