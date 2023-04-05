//MUI 컴포넌트
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import axios from "axios";
import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { applicationjson, CARBORN_SITE, ContentType } from "./../../../lib/api";

// 판매예약취소 모달
import { SellDeleteWarningModal } from "../ModalComponent/SellDeleteWarningModal";

export interface SellContentPaginationProps {
  itemsPerPage: number;
}

export interface SellContentType {
  id: number;
  carMaker: string;
  carModelNm: string;
  carModelYear: string;
  carRegNm: string;
  carMileage: number;
  price: number;
  saleStatus: number;
  regDt: null | string;
  modifiedBookStatusNum?: number;
}

export const StyledTableSellContentContainer = styled.div`
  width: 70vw;
`;

const StyleSellContentPaginationDiv = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .MuiPagination-root {
    position: absolute;
    top: 114vh;
  }

  .MuiButtonBase-root {
    background-color: #fffffff6;
  }

  .Mui-selected {
    background-color: #d23131 !important;
    color: white;
  }
`;

export const StyleTableHeadSellContentPagination = styled.div`
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

export const StyleTableCellDivSellContentPagination = styled.div`
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

const SellContentPagination = ({
  itemsPerPage,
}: SellContentPaginationProps) => {
  // 토큰 넣기
  const ObjString:any = localStorage.getItem("login-token");
  const Obj = ObjString ? JSON.parse(ObjString) : null;
  const accessToken = Obj ? Obj.value : null;

  const [currentPage, setCurrentPage] = useState(1);
  const [sellData, setSellData] = useState<SellContentType[]>([]);
  const [totalPageCnt, setTotalPageCnt] = useState(0);

  const [isDeleteSellModal, setIsDeleteSellModal] = useState(false);
  const [isDeleteSellId, setIsDeleteSellId] = useState(0);

  const handleRequestSellData = async (page: number, count: number) => {
    try {
      const response = await axios.get(
        `${CARBORN_SITE}/api/user/car/sell/list/${page}/${count}`,
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

  const totalPages = totalPageCnt;

  useEffect(() => {
    handleRequestSellData(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  if (sellData.length === 0) {
    return <div>No data Found!</div>;
  }

  // 모달 열 때
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
      <StyledTableSellContentContainer>
        <StyleTableHeadSellContentPagination>
          {sellData.map((sell: SellContentType, index: number) => (
            <StyleTableCellDivSellContentPagination key={index}>
              <div className="basic">
                <div>
                  <h2>{sell.carMaker}</h2>
                  <h1>{sell.carModelNm}</h1>
                </div>
                <h4>{sell.carRegNm}</h4>
              </div>
              <div className="content">
                <div>
                  <h4>{`연식(년)`}</h4>
                  <h4>{sell.carModelYear}</h4>
                </div>
                <div>
                  <h4>{"구매가(원)"}</h4>
                  <h4>{sell.price.toLocaleString()}</h4>
                </div>
              </div>
              {sell.modifiedBookStatusNum === 0 ? (
                <div
                  className="detail booking"
                  onClick={() => handleSellData(sell.id)}
                >
                  {sell.saleStatus}
                </div>
              ) : null}
              {sell.modifiedBookStatusNum === 1 ? (
                <div className="detail complete">{sell.saleStatus}</div>
              ) : null}
              {sell.modifiedBookStatusNum === 2 ? (
                <div className="detail cancel">{sell.saleStatus}</div>
              ) : null}
            </StyleTableCellDivSellContentPagination>
          ))}
        </StyleTableHeadSellContentPagination>
      </StyledTableSellContentContainer>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(event, value) => handleRequestSellData(value, itemsPerPage)}
        color="primary"
        size="large"
        disabled={totalPages === 0}
      />
      <SellDeleteWarningModal
        message="구매예약을 취소하시겠습니까?"
        onClose={handleCloseModal}
        bookid={isDeleteSellId}
        isOpen={isDeleteSellModal}
      />
    </StyleSellContentPaginationDiv>
  );
};

export default SellContentPagination;
