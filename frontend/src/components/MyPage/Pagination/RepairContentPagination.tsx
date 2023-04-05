//MUI 컴포넌트
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import axios from "axios";
import { applicationjson, CARBORN_SITE, ContentType } from "./../../../lib/api";
import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

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

export const StyledTableRepairContentContainer = styled.div`
  width: 70vw;
`;

export const StyleRepairPaginationDiv = styled.div`
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

export const StyleTableHeadRepairPagination = styled.div`
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

export const StyleTableCellDivRepairPagination = styled.div`
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

    &:hover {
      background-color: #00bc0d;
      color: #ffffff;
      transition: all 0.5s;
    }
  }

  .complete {
    background-color: #d2313190;
    color: #00000050;
    cursor: pointer;

    &:hover {
      background-color: #d23131;
      color: #ffffff;
      transition: all 0.5s;
    }
  }

  .cancel {
    background-color: #a9a9a990;
    color: #00000050;
    cursor: pointer;

    &:hover {
      background-color: #a9a9a9;
      color: #ffffff;
      transition: all 0.5s;
    }
  }
  `;

const RepairContentPagination = ({
  itemsPerPage,
}: RepairContentPaginationProps) => {

  // 토큰 넣기
  const ObjString:any = localStorage.getItem("login-token");
  const Obj = ObjString ? JSON.parse(ObjString) : null;
  const accessToken = Obj ? Obj.value : null;

  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [repairData, setRepairData] = useState<RepairType[]>([]);
  const [totalPageCnt, setTotalPageCnt] = useState(0);
  
  const handleRequestRepairData = async (page: number, count: number) => {
    try {
      const response = await axios.get(
        `${CARBORN_SITE}/api/user/repair/book/list/${page}/${count}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            [ContentType]: applicationjson,
          },
        }
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

  const totalPages = totalPageCnt;

  useEffect(() => {
    handleRequestRepairData(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  if (repairData.length === 0) {
    return <div>No data Found!</div>;
  }

  const getRepairBookDetail = (bookId: number) => {
    if (Obj.userId) {
      localStorage.setItem("bookId", String(bookId));
      const index = repairData.findIndex((item) => item.id === bookId);
      navigate(`/user/mypage/repair/${bookId}/bookdetail`, {
        state: repairData[index],
      });
    }
  };

  const getRepairDetail = (resultId: number) => {
    if (Obj.userId) {
      localStorage.setItem("resultId", String(resultId));
      const index = repairData.findIndex((item) => item.id === resultId);
      navigate(`/user/mypage/repair/${resultId}/completedetail`, {
        state: repairData[index],
      });
    }
  };

  return (
    <StyleRepairPaginationDiv>
      <StyledTableRepairContentContainer>
        <StyleTableHeadRepairPagination>
          {repairData.map((car: RepairType, index: number) => (
            <StyleTableCellDivRepairPagination key={index}>
              <div className="basic">
                <div>
                  <h2>{car.carMaker}</h2>
                  <h1>{car.carModelNm}</h1>
                </div>
                <h4>{car.carRegNm}</h4>
              </div>
              <div className="content">
                <div>
                  <h4>정비업체</h4>
                  <h4>{car.repairShopAccountName}</h4>
                </div>
                <div>
                  <h4>정비예약일</h4>
                  <h4>{car.bookDt}</h4>
                </div>
              </div>
              {car.modifiedBookStatusNum === 0 ? (
                <div
                  className="detail booking"
                  onClick={() => getRepairBookDetail(car.id)}
                >
                  {car.bookStatus}
                </div>
              ) : null}
              {car.modifiedBookStatusNum === 1 ? (
                <div
                  className="detail complete"
                  onClick={() => getRepairDetail(car.id)}
                >
                  {car.bookStatus}
                </div>
              ) : null}
              {car.modifiedBookStatusNum === 2 ? (
                <div className="detail cancel">{car.bookStatus}</div>
              ) : null}
            </StyleTableCellDivRepairPagination>
          ))}
        </StyleTableHeadRepairPagination>
      </StyledTableRepairContentContainer>
      <Stack spacing={2}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(event, value) =>
            handleRequestRepairData(value, itemsPerPage)
          }
          sx={{ backgroundColor: "transparent" }}
          size="large"
          disabled={totalPages === 0}
        />
      </Stack>
    </StyleRepairPaginationDiv>
  );
};

export default RepairContentPagination;
