//MUI 컴포넌트
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import axios from "axios";
import { CARBORN_SITE } from "./../../../lib/api";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

export interface InspectorContentPaginationProps {
  itemsPerPage: number;
}

export interface InspectorType {
  id: number;
  carMaker: string;
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

export const StyledTableInspectorContentContainer = styled.div`
  width: 70vw;
`;

const StyleInspectorPaginationDiv = styled.div`
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

export const StyleTableHeadInspectorPagination = styled.div`
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

export const StyleTableCellDivInspectorPagination = styled.div`
  &:hover {
    transition: all 1s;
    box-shadow: 0px 0px 30px 5px rgba(0, 0, 0, 0.5);
    transform: scale(1.05);
    box-shadow: 0px 0px 30px 5px rgba(0, 0, 0, 0.5), 0px 0px 0px 5px #fff;
    background-color: #000000;
    color: #fff;

    .detail {
      transition: all 1s;
      color: white;
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

const InspectorContentPagination = ({
  itemsPerPage,
}: InspectorContentPaginationProps) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [inspectorData, setInspectorData] = useState<InspectorType[]>([]);
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

  const getInspectorBookDetail = (bookId: number) => {
    if (Obj.userId) {
      localStorage.setItem("bookId", String(bookId));
      const index = inspectorData.findIndex((item) => item.id === bookId);
      navigate(`/user/mypage/inspector/${bookId}/bookdetail`, {
        state: inspectorData[index],
      });
    }
  };

  const getInspectorDetail = (resultId: number) => {
    if (Obj.userId) {
      localStorage.setItem("resultId", String(resultId));
      const index = inspectorData.findIndex((item) => item.id === resultId);
      navigate(`/user/mypage/inspector/${resultId}/completedetail`, {
        state: inspectorData[index],
      });
    }
  };

  console.log(inspectorData);

  return (
    <StyleInspectorPaginationDiv>
      <StyledTableInspectorContentContainer>
        <StyleTableHeadInspectorPagination>
          {inspectorData.map((car: InspectorType, index: number) => (
            <StyleTableCellDivInspectorPagination key={index}>
              <div className="basic">
                <div>
                  <h2>{car.carMaker}</h2>
                  <h1>{car.carModelNm}</h1>
                </div>
                <h4>{car.carRegNm}</h4>
              </div>
              <div className="content">
                <div>
                  <h4>검수업체</h4>
                  <h4>{car.inspectorAccountName}</h4>
                </div>
                <div>
                  <h4>검수예약일</h4>
                  <h4>{car.bookDt}</h4>
                </div>
              </div>
              {car.modifiedBookStatusNum === 0 ? (
                <div
                  className="detail booking"
                  onClick={() => getInspectorBookDetail(car.id)}
                >
                  {car.bookStatus}
                </div>
              ) : null}
              {car.modifiedBookStatusNum === 1 ? (
                <div
                  className="detail complete"
                  onClick={() => getInspectorDetail(car.id)}
                >
                  {car.bookStatus}
                </div>
              ) : null}
              {car.modifiedBookStatusNum === 2 ? (
                <div className="detail cancel">{car.bookStatus}</div>
              ) : null}
            </StyleTableCellDivInspectorPagination>
          ))}
        </StyleTableHeadInspectorPagination>
      </StyledTableInspectorContentContainer>
      <Stack spacing={2}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(event, value) =>
            handleRequestInspectorData(value, itemsPerPage)
          }
          sx={{ backgroundColor: "transparent" }}
          size="large"
          disabled={totalPages === 0}
        />
      </Stack>
    </StyleInspectorPaginationDiv>
  );
};
export default InspectorContentPagination;
