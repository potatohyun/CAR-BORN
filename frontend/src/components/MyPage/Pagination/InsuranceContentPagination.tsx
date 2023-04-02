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

export interface InsuranceContentPaginationProps {
  itemsPerPage: number;
}
export interface InsuranceType {
  id: number;
  carMaker: string;
  carModelNm: string;
  carRegNm: string;
  carModelYear: number;
  category: number;
  insuranceDt: string;
  insuranceCompanyAccountId: string;
}

const StyleInsurancePaginationDiv = styled.div`
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

const InsuranceContentPagination = ({
  itemsPerPage,
}: InsuranceContentPaginationProps) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [insuranceData, setInsuranceData] = useState<InsuranceType[]>([]);
  const [totalPageCnt, setTotalPageCnt] = useState(0);

  const handleRequestInsuranceData = async (page: number, count: number) => {
    try {
      const response = await axios.get(
        `${CARBORN_SITE}/api/user/insurance/list/${page}/${count}`
      );
      setTotalPageCnt(response.data.message.totalPages);
      setInsuranceData(response.data.message.content)
      setCurrentPage(page);
    } catch (error) {
      console.error(error);
    }
  };

  const ObjString: string | null = localStorage.getItem("login-token");
  const Obj = ObjString ? JSON.parse(ObjString) : null;
  const totalPages = totalPageCnt;

  useEffect(() => {
    handleRequestInsuranceData(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  if (insuranceData.length === 0) {
    return <div>No data Found!</div>;
  }

  const getInsuranceDetail = (resultId: number) => {
    if (Obj.userId) {
      navigate(`/${Obj.userId}/mypage/insurance/${resultId}/completedetail`, {
        state: insuranceData[resultId % 5],
      });
    }
  };

  return (
    <StyleInsurancePaginationDiv>
      <StyledTableContainer>
        <Table>
          <StyledTableHead>
            <TableRow>
              <TableCell>차량모델</TableCell>
              <TableCell>제조사</TableCell>
              <TableCell>차량번호</TableCell>
              <TableCell>{`연식(년)`}</TableCell>
              <TableCell>보험종류</TableCell>
              <TableCell>보험처리일자</TableCell>
              <TableCell>보험사명</TableCell>
              <TableCell>완료상세조회</TableCell>
            </TableRow>
          </StyledTableHead>
          <StyleMainTableHead>
            {insuranceData.map((insurance: InsuranceType, index: number) => (
              <TableRow key={index}>
                <TableCell>{insurance.carModelNm}</TableCell>
                <TableCell>{insurance.carMaker}</TableCell>
                <TableCell>{insurance.carRegNm}</TableCell>
                <TableCell>{insurance.carModelYear}</TableCell>
                <TableCell>{insurance.category}</TableCell>
                <TableCell>
                  {insurance.insuranceDt === null
                    ? "-"
                    : insurance.insuranceDt}
                </TableCell>
                <TableCell>{insurance.insuranceCompanyAccountId}</TableCell>
                <TableCell>
                  <StyledButton onClick={() => getInsuranceDetail(insurance.id)}>
                    상세조회
                  </StyledButton>
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
            handleRequestInsuranceData(value, itemsPerPage)
          }
          sx={{ backgroundColor: "white" }}
          size="large"
          disabled={totalPages === 0}
        />
      </Stack>
    </StyleInsurancePaginationDiv>
  );
};

export default InsuranceContentPagination;

// 페이지네이션 컴포넌트
export const BasicPagination = () => {
  return (
    <Stack spacing={2}>
      <Pagination count={10} color="primary" />
    </Stack>
  );
};
