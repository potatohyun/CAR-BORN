//MUI 컴포넌트
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import axios from "axios";
import { applicationjson, CARBORN_SITE, ContentType } from "./../../../lib/api";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

export interface InsuranceContentPaginationProps {
  itemsPerPage: number;
}
export interface InsuranceType {
  id: number;
  carMaker: string;
  carModelNm: string;
  carRegNm: string;
  carModelYear: number;
  category: string;
  insuranceDt: string;
  insuranceCompanyAccountName: string;
}

export const StyledTableInsuranceContentContainer = styled.div`
  width: 70vw;
`;

const StyleInsurancePaginationDiv = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .MuiStack-root {
    position: absolute;
    top: 181vh;
  }

  .MuiButtonBase-root {
    background-color: #fffffff6;
  }

  .Mui-selected {
    background-color: #d23131 !important;
    color: white;
  }
`;

export const StyleTableHeadInsurancePagination = styled.div`
  & .MuiTableCell-head {
    font-weight: bold;
    text-align: center;
  }

  display: flex;
  flex-wrap: wrap;

  & > div {
    margin-top: 1.2rem;

    &:nth-of-type(odd) {
      margin-right: 2%;
    }

    &:nth-of-type(even) {
      margin-right: 0;
    }
  }
`;

export const StyleTableCellDivInsurancePagination = styled.div`
  &:hover {
    color: black;
    border: 3px solid #d23131;

    .detail {
      background-color: #d23131;
      color: white;
    }

    .booking {
      background-color: #00bc0d;
      color: white;
    }

    .complete {
      color: white;
      background-color: #d23131;
    }

    .cancel {
      color: white;
      background-color: #a9a9a9;
    }
  }

  box-sizing: border-box;
  width: 49%;
  height: 20vh;
  border: 1px solid #00000050;
  border-radius: 5px;
  background-color: white;

  display: grid;
  grid-template-columns: 5fr 2fr 1fr;

  .basic {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-right: 1px dashed #00000050;
    h1,
    h2,
    h4 {
      margin: 0;
    }
  }

  .content {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h4,
    h3 {
      margin: 0;
    }

    div {
      width: 100%;
      height: 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    div:nth-of-type(1) {
      border-bottom: 1px dashed #00000050;
    }
  }

  .detail {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 900;
    cursor: pointer;
  }

  .booking {
    background-color: #00810950;
    color: #00000050;
    cursor: pointer;

  }

  .complete {
    background-color: #d2313190;
    color: #00000050;
    cursor: pointer;

  }

  .cancel {
    background-color: #a9a9a990;
    color: #00000050;
    cursor: pointer;
  }
`;

const InsuranceContentPagination = ({
  itemsPerPage,
}: InsuranceContentPaginationProps) => {

  // 토큰 넣기
  const ObjString:any = localStorage.getItem("login-token");
  const Obj = ObjString ? JSON.parse(ObjString) : null;
  const accessToken = Obj ? Obj.value : null;

  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [insuranceData, setInsuranceData] = useState<InsuranceType[]>([]);
  const [totalPageCnt, setTotalPageCnt] = useState(0);

  const handleRequestInsuranceData = async (page: number, count: number) => {
    try {
      const response = await axios.get(
        `${CARBORN_SITE}/api/user/insurance/list/${page}/${count}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            [ContentType]: applicationjson,
          },
        }
      );

      setTotalPageCnt(response.data.message.totalPages);
      setInsuranceData(response.data.message.content);
      setCurrentPage(page);
    } catch (error) {
      console.error(error);
    }
  };

  const totalPages = totalPageCnt;

  useEffect(() => {
    handleRequestInsuranceData(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  if (insuranceData.length === 0) {
    return <div>No data Found!</div>;
  }

  const getInsuranceDetail = (resultId: number) => {
    if (Obj.userId) {
      localStorage.setItem("resultId", String(resultId));
      const index = insuranceData.findIndex((item) => item.id === resultId);
      navigate(`/user/mypage/insurance/${resultId}/completedetail`, {
        state: insuranceData[index],
      });
    }
  };

  console.log(insuranceData);

  return (
    <StyleInsurancePaginationDiv>
      <StyledTableInsuranceContentContainer>
        <StyleTableHeadInsurancePagination>
          {insuranceData.map((car: InsuranceType, index: number) => (
            <StyleTableCellDivInsurancePagination key={index}>
              <div className="basic">
                <div>
                  <h2>{car.carMaker}</h2>
                  <h1>{car.carModelNm}</h1>
                </div>
                <h4>{car.carRegNm}</h4>
              </div>
              <div className="content">
                <div>
                  <h4>보험사명</h4>
                  <h4>{car.insuranceCompanyAccountName}</h4>
                </div>
                <div>
                  <h4>보험처리일</h4>
                  <h4>{car.insuranceDt.slice(0,10)}</h4>
                </div>
              </div>
              { car.category === "사고" ? <div
                className="detail complete"
                onClick={() => getInsuranceDetail(car.id)}
              >
                {car.category}
              </div> : null }
              { car.category === "자연재해" ? <div
                className="detail booking"
                onClick={() => getInsuranceDetail(car.id)}
              >
                {car.category}
              </div> : null }
              { car.category !== "사고" && car.category !== "자연재해" ? <div
                className="detail cancel"
                onClick={() => getInsuranceDetail(car.id)}
              >
                {car.category}
              </div> : null }
            </StyleTableCellDivInsurancePagination>
          ))}
        </StyleTableHeadInsurancePagination>
      </StyledTableInsuranceContentContainer>
      <Stack spacing={2}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(event, value) =>
            handleRequestInsuranceData(value, itemsPerPage)
          }
          sx={{ backgroundColor: "transparent" }}
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
