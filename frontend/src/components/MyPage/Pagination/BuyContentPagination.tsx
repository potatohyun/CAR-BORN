//MUI 컴포넌트
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import axios from "axios";
import { applicationjson, CARBORN_SITE, ContentType } from "./../../../lib/api";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";

// 구매예약취소 모달
import { BuyDeleteWarningModal } from "../ModalComponent/BuyDeleteWarningModal";

interface BuyContentPaginationProps {
  itemsPerPage: number;
}

export interface BuyContentType {
  id: number;
  carSaleCarMaker: string;
  carSaleCarModelNm: string;
  carSaleCarModelYear: string;
  carSaleCarRegNm: string;
  carSaleCarMileage: number;
  carSalePrice: number;
  bookStatus: number;
  regDt: string;
  modifiedBookStatusNum: number;
}

export const StyledTableBuyContentContainer = styled.div`
  width: 70vw;
`;

const StyleBuyContentPaginationDiv = styled.div`
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

export const StyleTableHeadBuyContentPagination = styled.div`
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

export const StyleTableCellDivBuyContentPagination = styled.div`
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

const BuyContentPagination = ({
  itemsPerPage,
}: BuyContentPaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [buyData, setBuyData] = useState<BuyContentType[]>([]);
  const [totalPageCnt, setTotalPageCnt] = useState(0);

  // 예약 취소 모달 때문에 만듬
  const [isDeleteBuyModal, setIsDeleteBuyModal] = useState(false);
  const [isDeleteBuyId, setIsDeleteBuyId] = useState(0);

  // 토큰 넣기
  const ObjString:any = localStorage.getItem("login-token");
  const Obj = ObjString ? JSON.parse(ObjString) : null;
  const accessToken = Obj ? Obj.value : null;

  const handleRequestBuyData = async (page: number, count: number) => {

    try {
      const response = await axios.get(
        `${CARBORN_SITE}/api/user/car/buy/list/${page}/${count}`,
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

  const totalPages = totalPageCnt;

  useEffect(() => {
    handleRequestBuyData(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  if (buyData.length === 0) {
    return <div>No data Found!</div>;
  }

  // 모달 열 때
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
      <StyledTableBuyContentContainer>
        <StyleTableHeadBuyContentPagination>
          {buyData.map((buy: BuyContentType, index: number) => (
            <StyleTableCellDivBuyContentPagination key={index}>
              <div className="basic">
                <div>
                  <h2>{buy.carSaleCarMaker}</h2>
                  <h1>{buy.carSaleCarModelNm}</h1>
                </div>
                <h4>{buy.carSaleCarRegNm}</h4>
              </div>
              <div className="content">
                <div>
                  <h4>{`연식(년)`}</h4>
                  <h4>{buy.carSaleCarModelYear}</h4>
                </div>
                <div>
                  <h4>{"구매가(원)"}</h4>
                  <h4>{buy.carSalePrice.toLocaleString()}</h4>
                </div>
              </div>
              {buy.modifiedBookStatusNum === 0 ? (
                <div
                  className="detail booking"
                  onClick={() => handleBuyData(buy.id)}
                >
                  {buy.bookStatus}
                </div>
              ) : null}
              {buy.modifiedBookStatusNum === 1 ? (
                <div className="detail complete">{buy.bookStatus}</div>
              ) : null}
              {buy.modifiedBookStatusNum === 2 ? (
                <div className="detail cancel">{buy.bookStatus}</div>
              ) : null}
            </StyleTableCellDivBuyContentPagination>
          ))}
        </StyleTableHeadBuyContentPagination>
      </StyledTableBuyContentContainer>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(event, value) => handleRequestBuyData(value, itemsPerPage)}
        color="primary"
        size="large"
        disabled={totalPages === 0}
      />
      <BuyDeleteWarningModal
        message="구매예약을 취소하시겠습니까?"
        onClose={handleCloseModal}
        bookid={isDeleteBuyId}
        isOpen={isDeleteBuyModal}
      />
    </StyleBuyContentPaginationDiv>
  );
};

export default BuyContentPagination;
