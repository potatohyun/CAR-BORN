//MUI 컴포넌트
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import axios from "axios";
import { applicationjson, CARBORN_SITE, ContentType } from "./../../../lib/api";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

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

export const StyledTableMyCarInfoContainer = styled.div`
  width: 70vw;
  background-color: transparent;
`;

export const StyledPagination = styled((props: any) => <Pagination {...props} />)`
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 115vh;
  left: 46.5vw;

  & .MuiPaginationItem-root.Mui-selected {
    background-color: #d23131;
    color: white;
  }
`;

export const StyleTableHeadMyCarInfoPagination = styled.div`

  & .MuiTableCell-head {
    font-weight: bold;
    text-align: center;
  }

  display:flex;
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
`
// 여기 기반으로 꾸미면 될듯
export const StyleTableCellDivMyCarInfoPagination = styled.div`
  &:hover {
    color: black;
    border: 3px solid #d23131;

    .detail {
      background-color: #d23131;
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
  grid-template-columns: 2fr 1fr 1fr; 

  .basic {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-right: 1px dashed #00000050;
    h1, h2, h4 {
      margin: 0;
    }
  }

  .content {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h4, h3 {
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

    div:nth-of-type(odd) {
      border-bottom: 1px dashed #00000050;
    }
  }

  .detail {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;

    background-color: #d2313190;
    color: #00000050;
    font-weight: 900;
    cursor: pointer;
  }
`

const StyleMyCarInfoPaginationDiv = styled.div`
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
`

const MyCarInfoPagination = ({ itemsPerPage }: MyCarInfoPaginationProps) => {
  // 토큰 넣기
  const ObjString:any = localStorage.getItem("login-token");
  const Obj = ObjString ? JSON.parse(ObjString) : null;
  const accessToken = Obj ? Obj.value : null;

  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [myCarInfoData, setMyCarInfoData] = useState<Car[]>([]);
  const [totalPageCnt, setTotalPageCnt] = useState(0);

  const handleRequestMyCarInfoData = async (page: number, count: number) => {
    try {
      const response = await axios.get(
        `${CARBORN_SITE}/api/user/car/list/${page}/${count}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            [ContentType]: applicationjson,
          },
        }
      );
      setTotalPageCnt(response.data.message.totalPages);
      setMyCarInfoData(response.data.message.content);
      setCurrentPage(page);
    } catch (error) {
      console.error(error);
    }
  };

  const totalPages = totalPageCnt;

  useEffect(() => {
    handleRequestMyCarInfoData(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  if (myCarInfoData.length === 0) {
    return <div>No data Found!</div>;
  }

  const getCarInfoDetail = (carId: number) => {
    if (Obj.userId) {
      localStorage.setItem('carId', String(carId));
      navigate(`${carId}/detail`);
    }
  };

  return (
    <StyleMyCarInfoPaginationDiv>
      <StyledTableMyCarInfoContainer>
          <StyleTableHeadMyCarInfoPagination>
            {myCarInfoData.map((car: Car, index) => (
              <StyleTableCellDivMyCarInfoPagination key={index}>
                  <div className="basic">
                    <div>
                      <h2>{car.maker}</h2>
                      <h1>{car.modelNm}</h1>
                    </div>
                    <h4>{car.regNm}</h4>
                  </div>
                  <div className="content">
                    <div>
                      <h4>주행거리</h4>
                      <h4>{car.mileage.toLocaleString()}km</h4>
                    </div>
                    <div>
                      <h4>연식</h4>
                      <h4>{car.modelYear}</h4>
                    </div>
                  </div>
                  <div className="detail" onClick={() => getCarInfoDetail(car.id)}>
                    상세정보<br/>보러가기
                  </div>
              </StyleTableCellDivMyCarInfoPagination>
            ))}
          </StyleTableHeadMyCarInfoPagination>
      </StyledTableMyCarInfoContainer>
      <Stack spacing={2}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(event, value) =>
            handleRequestMyCarInfoData(value, itemsPerPage)
          }
          sx={{ backgroundColor: "transparent" }}
          size="large"
          disabled={totalPages === 0}
        />
      </Stack>
    </StyleMyCarInfoPaginationDiv>
  );
};

export default MyCarInfoPagination;
