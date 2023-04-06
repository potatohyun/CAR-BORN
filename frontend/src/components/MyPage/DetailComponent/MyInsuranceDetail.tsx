import styled from "@emotion/styled";
import { Table, TableCell, TableRow } from "@mui/material";

// 캐러셀
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // 스타일 시트를 import 해야함

// CarStatus 이미지 import 해오기
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { applicationjson, CARBORN_SITE, ContentType } from "../../../lib/api";
import Nav2 from "../../Nav2";
import { StyleKlaytnBtn } from "./MyRepairDetail";
import { CARBORN_IMG } from "./MyCarInfoDetail";

const StyleMyInsuranceDetailDiv = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  /* background: linear-gradient(
    to bottom,
    #000000,
    #1e0000e8
  );
  background-size: 100% 200%;
  animation: gradient 10s ease infinite;
  
  @keyframes gradient {
    0% {
      background-position: 0% 0%;
    }
    50% {
      background-position: 0% 100%;
    }
    100% {
      background-position: 0% 0%;
    }
  } */
`;

const StyleMyInsuranceDetailContainerDiv = styled.div`
  width: 73vw;
  border: 1px dashed #00000020;
  margin-top: 15vh;
  margin-bottom: 15vh;
  background-color: #fffffff6;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 3rem;
  padding-left: 3rem;
  padding-right: 3rem;
`;

const StyleMyInsuranceDetailHeaderDiv = styled.div`
  width: 71.5vw;
  height: 12vh;
  margin-bottom: 2vh;
  margin-left: 0.7rem;
  display: flex;
  justify-content: space-between;

  & > div:nth-of-type(1):hover {
    transition: all 1s;
    transform: scale(1.3);
  }

  & > div:not(:hover) {
    transition: all 1s;
    transform: scale(1);
  }
`;

// 헤더 제외 섹션
const StyleMainInsuranceDetailContainerDiv = styled.div`
  width: 72.5vw;
  height: 70vh;
  margin-top: 4rem;

  display: flex;
  justify-content: center;
`;

const StyleMyInsuranceLeftDetailDiv = styled.div`
  width: 34vw;
  height: 60vh;
  margin-top: -1.8rem;
  display: flex;
  justify-content: center;
`;

const StyleMyInsuranceRightDetailDiv = styled.div`
  width: 46vw;
  height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledCarousel = styled(Carousel)`
  max-width: 90%;
  border-radius: 10px;
  margin-top: 2rem;

  div,
  img {
    border-radius: 10px;
  }
`;

export const StyleInsuranceDetailCarousels = styled.div`
  .carousel-container {
    max-width: 800px;
    margin: 0 auto;
  }

  .slick-list {
    overflow: visible;
  }

  .slick-slide img {
    width: 50%;
    object-fit: contain;
  }

  .modal {
    position: fixed;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;

    width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;
  }

  .modal-content {
    width: 100%;
    height: 100%;

    position: fixed;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;

    overflow: auto;

    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 60%;
    }
  }

  .carousel-root {
    width: 50%;
    margin-top: 2rem !important;
    margin-left: 2rem !important;
  }import { StyleKlaytnBtn } from './MyRepairDetail';

`;

const StyleXButton = styled.div`
  font-weight: 900;
  font-size: 1.2rem;
  position: absolute;
  right: 10.5vw;
  top: 67vh;
  cursor: pointer;
`;

// 내 검수 정보 전체 컨테이너
const StyleTableDivInsuranceDetail = styled.div`
  border: 1px dashed #00000050;
  width: 41vw;
  height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 제조사, 차량모델
const StyleTableCarMakerModelDiv = styled.div`
  width: 12vw;
  height: 4vh;
  margin-top: 3vh;
  display: flex;
  justify-content: center;
  align-items: center;

  span:nth-of-type(1) {
    display: inline-block;
    margin-right: 0.5vw;
    font-size: 1rem;
    font-weight: 500;
  }

  span:nth-of-type(2) {
    display: inline-block;
    font-size: 1.5rem;
    font-weight: 700;
  }
`;

// 차량번호
export const StyleTableCarRegNmDiv = styled.div`
  width: 12vw;
  height: 5vh;
  margin-bottom: 2vh;

  display: flex;
  justify-content: center;
  align-items: center;

  span {
    font-size: 2rem;
    font-weight: 900;
  }
`;

// 나머지 정보
const StyleTableInsuranceInfoDiv = styled.div`
  width: 45vw;
  height: 15vh;
  margin-top: 3vh;

  tr:nth-of-type(1) {
    background-color: #d23131;
    color: white;
    td {
      font-size: 1rem;
      font-weight: 900;
    }
  }

  tr:nth-of-type(2) {
    td {
      font-weight: 900;
    }
    td:hover {
      transition: all 0.5s;
      color: #d23131;
      background-color: black;
    }
  }

  & > tr {
    display: grid;
    grid-template-columns: 2fr 1fr 2fr;
    td {
      font-size: 0.7rem;
    }
  }
`;

// 검수내역
const StyleInsuranceResultContent = styled.div`
  font-size: 0.9rem;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  max-height: 300px; /* 스크롤이 표시되기 전의 높이 지정 */

  li {
    font-weight: 700;
    line-height: 1.2rem;
    list-style-type: decimal;
  }

  li:hover {
    color: #d23131;
  }

  & > span:hover {
    color: #d23131;
  }
`;

export type insuranceResultType = {
  setInsuranceResult: React.SetStateAction<any[]>;
  insuranceResult: any;
};

const MyInsuranceDetail = () => {
  // 토큰 넣기
  const ObjString:any = localStorage.getItem("login-token");
  const Obj = ObjString ? JSON.parse(ObjString) : null;
  const accessToken = Obj ? Obj.value : null;

  const param = useParams();
  const resultid = param.carId;
  const location = useLocation();
  const dispatch = useDispatch();
  const detail = location.state;

  const [images, setImages] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  // 데이터 관련
  const [insuranceResult, setInsuranceResult] = useState<any>("");

  // 보험 결과 보여주기 위한 데이터 가져오기.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: `${CARBORN_SITE}/api/user/insurance/${resultid}`,
          headers: {
            Authorization: `Bearer ${accessToken}`,
            [ContentType]: applicationjson,
          },
        });

        let images:any[] = []
        images.push(CARBORN_IMG+response.data.message.insuranceImgNm)

        setImages(images)
        // 이미지 받아오기 용
        setInsuranceResult(response.data.message);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [setInsuranceResult, resultid]);

  // 뒤로가기
  const goBack = () => {
    window.history.back();
  };

  return (
    <StyleMyInsuranceDetailDiv>
      <Nav2 />
      <StyleMyInsuranceDetailContainerDiv>
        <StyleXButton onClick={() => goBack()}>X</StyleXButton>
        <StyleMyInsuranceDetailHeaderDiv>
          <div>
            <StyleTableCarMakerModelDiv>
              {/* 제조사, 차량모델 */}
              <span>{detail.carMaker}</span>
              <span>{detail.carModelNm}</span>
            </StyleTableCarMakerModelDiv>
            <StyleTableCarRegNmDiv>
              {/* 차량번호 */}
              <span>{detail.carRegNm}</span>
            </StyleTableCarRegNmDiv>
          </div>
          <StyleTableInsuranceInfoDiv>
            {/* 나머지 테이블 정보 */}
            <Table>
              <tbody>
                <TableRow>
                  <TableCell align="center">{`보험사명`}</TableCell>
                  <TableCell align="center">{`연식(년)`}</TableCell>
                  <TableCell align="center">{`원인`}</TableCell>
                  <TableCell align="center">보험처리일</TableCell>
                  <TableCell align="center">차대번호</TableCell>
                  <TableCell align="center">블록체인 기록정보</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">
                    {detail.insuranceCompanyAccountName === undefined
                      ? null
                      : detail.insuranceCompanyAccountName}
                  </TableCell>
                  <TableCell align="center">{detail.carModelYear}</TableCell>
                  <TableCell align="center">
                    {detail.category === undefined
                      ? null
                      : detail.category}
                  </TableCell>
                  <TableCell align="center">
                    {detail && detail.insuranceDt && detail.insuranceDt.slice(0, 10)}
                  </TableCell>
                  <TableCell align="center">
                    {insuranceResult &&
                    insuranceResult.carVin}
                  </TableCell>
                  <TableCell align="center">
                    <a href={insuranceResult.metadataUri}>
                      <StyleKlaytnBtn>
                        원본 확인
                      </StyleKlaytnBtn>
                    </a>
                  </TableCell>
                </TableRow>
              </tbody>
            </Table>
          </StyleTableInsuranceInfoDiv>
        </StyleMyInsuranceDetailHeaderDiv>
        {/* 밑에 메인 섹션 부분 */}
        <StyleMainInsuranceDetailContainerDiv>
          <StyleMyInsuranceLeftDetailDiv>
            {/* 캐러셀 정보  */}
            <StyledCarousel transitionTime={1000}>
              {images.map((image, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setSelectedImage(image);
                    setShowModal(true);
                  }}
                >
                  <img src={image} alt={`${index}`} />
                  <p className="legend">
                    {index + 1}. {image}
                  </p>
                </div>
              ))}
            </StyledCarousel>
            {showModal && (
              <StyleInsuranceDetailCarousels>
                <div className="modal">
                  <div
                    className="modal-content"
                    onClick={() => setShowModal(false)}
                  >
                    <img src={selectedImage} alt="modal" />
                  </div>
                </div>
              </StyleInsuranceDetailCarousels>
            )}
          </StyleMyInsuranceLeftDetailDiv>
          <StyleMyInsuranceRightDetailDiv>
            <StyleTableDivInsuranceDetail>
              {insuranceResult &&
                insuranceResult.content &&
                insuranceResult.content.trim() && (
                  <StyleInsuranceResultContent>
                    {/* {inspectorResult.content
                      .split("-")
                      .slice(1)
                      .map((content: any, index: any) => (
                        <li key={index}>{content}</li>
                      ))} */}
                    <span>{insuranceResult.content}</span>
                  </StyleInsuranceResultContent>
                )}
            </StyleTableDivInsuranceDetail>
          </StyleMyInsuranceRightDetailDiv>
        </StyleMainInsuranceDetailContainerDiv>
      </StyleMyInsuranceDetailContainerDiv>
    </StyleMyInsuranceDetailDiv>
  );
};

export default MyInsuranceDetail;
