//MUI 컴포넌트
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import axios from "axios";
import { applicationjson, CARBORN_SITE, ContentType } from "./../../../lib/api";
import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

export interface MyCommunityContentPaginationProps {
  itemsPerPage: number;
}

export interface MyCommunityType {
  title: string;
  regDt: string;
  content: string;
  id: number;
}

export const StyledTableMyCommunityContentContainer = styled.div`
  width: 70vw;
`;

export const StyleMyCommunityPaginationDiv = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .MuiStack-root {
    position: absolute;
    top: 131vh;
  }

  .MuiButtonBase-root {
    background-color: #fffffff6;
  }

  .Mui-selected {
    background-color: #d23131 !important;
    color: white;

  }
`;

export const StyleTableHeadMyCommunityPagination = styled.div`
  & .MuiTableCell-head {
    font-weight: bold;
    text-align: center;
  }

  display: flex;
  flex-wrap: wrap;

  & > div {
    margin-top: 1.2rem;

    & {
      margin-right: 2%;
    }

    &:nth-of-type(3n) {
      margin-right: 0;
    }
  }
`;

export const StyleTableCellDivMyCommunityPagination = styled.div`
  
  display: grid;
  grid-template-rows: 3fr 3fr;

  box-sizing: border-box;
  width: 32%;
  height: 18vh;
  border-radius: 5px;
  border: 3px solid 2px solid #d23131;
  background-color: #ffffff;
  
  &:hover {
    transition: all 1s;
    box-shadow: 0px 0px 30px 5px rgba(0, 0, 0, 0.5);
    transform: scale(1.05);
    box-shadow: 0px 0px 30px 5px rgba(0, 0, 0, 0.5), 0px 0px 0px 5px #fff;
    border: none;
    background-color: #000000;
    color: #fff;

    .content > div {
      transition: all 1s;
      color: white;
      background-color: black !important;
      border-bottom: 3px solid #822020;
    }

    .detail > div:nth-of-type(1) {
      transition: all 1s;
      color: white;
      background-color: black !important;
      border-bottom: 3px solid #822020;
    }

    .detail > div:nth-of-type(2) {
      transition: all 1s;
      color: white;
      background-color: black !important;
      border: 3px solid #822020;
    }
  }

  .content {
    border-left: 1px dashed #00000050;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;

    div {
      width: 77%;
      height: 60%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.1rem;
      font-weight: 900;
      color: #000000aa;
      border-radius: 5px;
      border-bottom: 2px solid #d23131;
    }

  }

  .cancel {
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
    color: #000000c5;
    cursor: pointer;

    display: grid;
    grid-template-columns: 5fr 4fr;
    place-items: center;

    div {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.1rem;
      font-weight: 900;
      color: #000000aa;
      border-bottom: 2px solid #d23131;
    }

    div:nth-of-type(1) {
      width: 8rem;
      height: 2.5rem;
    }

    div:nth-of-type(2) {
      width: 5rem;
      height: 2.5rem;
    }

    div:nth-of-type(2):hover {
      background-color: #ff6600 !important;
    }
  }
`;

const MyCommunityContentPagination = ({
  itemsPerPage,
}: MyCommunityContentPaginationProps) => {
  // 토큰 넣기
  const ObjString:any = localStorage.getItem("login-token");
  const Obj = ObjString ? JSON.parse(ObjString) : null;
  const accessToken = Obj ? Obj.value : null;

  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [myCommunityData, setMyCommunityData] = useState<MyCommunityType[]>([]);
  const [totalPageCnt, setTotalPageCnt] = useState(0);

  const handleRequestMyCommunityData = async (page: number, count: number) => {
    try {
      const response = await axios.get(
        `${CARBORN_SITE}/api/user/community/list/${page}/${count}/0`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            [ContentType]: applicationjson,
          },
        }
      );

      console.log(response.data.message.content);
      setTotalPageCnt(response.data.message.totalPages);
      setMyCommunityData(response.data.message.content);
      setCurrentPage(page);
    } catch (error) {
      console.error(error);
    }
  };

  const totalPages = totalPageCnt;

  useEffect(() => {
    handleRequestMyCommunityData(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  if (myCommunityData.length === 0) {
    return <div>No data Found!</div>;
  }

  const getMyCommunityDetail = (resultId: number) => {
    if (Obj.userId) {
      // localStorage.setItem("resultId", String(resultId));
      // const index = myCommunityData.findIndex((item) => item.id === resultId);
      // navigate(`/user/mypage/repair/${resultId}/completedetail`, {
      //   state: myCommunityData[index],
      // });
      navigate('/user/mypage')
    }
  };

  console.log(myCommunityData)

  return (
    <StyleMyCommunityPaginationDiv>
      <StyledTableMyCommunityContentContainer>
        <StyleTableHeadMyCommunityPagination>
          {myCommunityData.map((posts: MyCommunityType, index: number) => (
            <StyleTableCellDivMyCommunityPagination key={index}>
              <div className="content">
                <div>제목 : {posts.title.length >= 10 ? posts.title.slice(0, 10)+'...' : posts.title}</div>
              </div>
              <div className="detail cancel">
                <div>{posts.regDt.slice(0, 10)}</div>
                <div onClick={() => getMyCommunityDetail(posts.id)}>
                  보기
                </div>
              </div>
            </StyleTableCellDivMyCommunityPagination>
          ))}
        </StyleTableHeadMyCommunityPagination>
      </StyledTableMyCommunityContentContainer>
      <Stack spacing={2}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(event, value) =>
            handleRequestMyCommunityData(value, itemsPerPage)
          }
          sx={{ backgroundColor: "transparent" }}
          size="large"
          disabled={totalPages === 0}
        />
      </Stack>
    </StyleMyCommunityPaginationDiv>
  );
};

export default MyCommunityContentPagination;
