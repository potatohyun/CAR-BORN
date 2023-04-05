import styled from "@emotion/styled";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

// CarStatus 이미지 import 해오기
import carousel1 from "../../../assets/carousel/CarStatus1.jpg";
import carousel2 from "../../../assets/carousel/CarStatus2.jpg";
import carousel4 from "../../../assets/carousel/CarStatus4.jpg";
import carousel5 from "../../../assets/carousel/CarStatus5.jpg";
import carousel7 from "../../../assets/carousel/CarStatus7.jpg";
import carousel8 from "../../../assets/carousel/CarStatus8.jpg";
import carousel9 from "../../../assets/carousel/CarStatus9.jpg";
import carousel10 from "../../../assets/carousel/CarStatus10.jpg";

// 캐러셀
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // 스타일 시트를 import 해야함

// CarStatus 이미지 import 해오기
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { applicationjson, CARBORN_SITE, ContentType } from "../../../lib/api";
import Nav2 from "../../Nav2";
import { StyledTableMyCarInfoContainer } from "../Pagination/MyCarInfoPagination";

const StyleMyCarInfoDetailDiv = styled.div`
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

const StyleMyCarInfoDetailContainerDiv = styled.div`
  width: 70vw;
  border: 1px dashed #00000020;
  margin-top: 15vh;
  margin-bottom: 15vh;
  background-color: #fffffff6;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(255, 255, 255, 1);
  display: flex;
  justify-content: center;
  padding-top: 3rem;
  padding-left: 3rem;
`;

const StyledCarousel = styled(Carousel)`
  max-width: 60%;
  margin: 0 auto;
  margin-right: 1rem;
  border-radius: 10px;

  div, img {
    border-radius: 10px;
  }
`;

// 이거 기준으로 모두 수정하기
export const StyleMyCarInfoCarousels = styled.div`
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
  }
`;

const StyleXButton = styled.div`
  font-weight: 900;
  font-size: 1.2rem;
  position: absolute;
  right: 13vw;
  top: 66vh;
  cursor: pointer;
`

// 내 차량 상세 정보 전체 컨테이너
const StyleTableDivMyCarInfoDetail = styled.div`
  border: 1px dashed #00000050;
  width: 24vw;
  height: 71.5vh;
`

// 이미지
const StyleTableCarImgDiv = styled.div`
  width: 24vw;
  height: 40vh;
  margin-bottom: 1vh;
  img {
    width: 24vw;
    height: 40vh;
  }
`

// 제조사, 차량모델
const StyleTableCarMakerModelDiv = styled.div`
  width: 24vw;
  height: 4vh;

  display:flex;
  justify-content: center;
  align-items: center;

  span:nth-of-type(1){
    display: inline-block;
    margin-right: 0.5vw;
    font-size: 1rem;
    font-weight: 500;
  }

  span:nth-of-type(2){
    display: inline-block;
    font-size: 1.5rem;
    font-weight: 700;
  }
`
// 차량번호
export const StyleTableCarRegNmDiv = styled.div`
  width: 24vw;
  height: 5vh;
  margin-bottom: 2vh;

  display:flex;
  justify-content: center;
  align-items: center;

  span {
    font-size: 2rem;
    font-weight: 900;
  }
`
// 차대번호
const StyleTableCarVinDiv = styled.div`
  width: 24vw;
  height: 5vh;
  margin-bottom: 1vh;

  display:flex;
  justify-content: space-around;
  align-items: center;

  color: #0000006c;
`
// 나머지 정보
const StyleTableCarInfoDiv = styled.div`
  width: 24vw;
  height: 5vh;

  tr:nth-of-type(1) {
    background-color: #d23131;
    color: white;
    td {
      font-size: 0.8rem;
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
`

export type insuranceResultType = {
  setInspectorResult: React.SetStateAction<any[]>;
  inspectorResult: any;
};

const MyCarInfoDetail = () => {
  // 토큰 넣기
  const ObjString:any = localStorage.getItem("login-token");
  const Obj = ObjString ? JSON.parse(ObjString) : null;
  const accessToken = Obj ? Obj.value : null;

  const param = useParams();
  const carId = param.carId;

  // 이미지
  const [carouselImg, setCarouselImg] = useState<any[]>([]);
  const [images, setImages] = useState<any[]>([
    carousel1,
    carousel2,
    carousel4,
    carousel5,
    carousel7,
    carousel8,
    carousel9,
    carousel10,
  ]);

  // 이미지 모달 키우기
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [carInfoData, setCarInfoData] = useState<any>("");

  // 검수 결과 보여주기 위한 데이터 가져오기.
  useEffect(() => {
    // 배열 받는다 치고
    // setCarouselImg(detail.images);
  }, []);

  useEffect(() => {
    const fetchData = async (carId: string | number | undefined) => {
      try {
        const response = await axios({
          method: "GET",
          url: `${CARBORN_SITE}/api/user/car/${carId}`,
          headers: {
            Authorization: `Bearer ${accessToken}`,
            [ContentType]: applicationjson,
          },
        });
        setCarInfoData(response.data.message.detail);
        return response.data.message.content;
      } catch (error) {
        console.log(error);
      }
    };
    fetchData(carId);
  }, []);

  // 페이지 beforeunload 시 로컬 스토리지에서 "carId" 데이터 제거
  useEffect(() => {
    localStorage.removeItem("carId");
  }, []);
  
  // 뒤로가기
  const goBack = () => {
    window.history.back()
  }

  return (
    <StyleMyCarInfoDetailDiv>
      <Nav2 />
      <StyleMyCarInfoDetailContainerDiv>
        <StyleXButton onClick={() => goBack()}>X</StyleXButton>
        {/* 이미지 받아오기 images를 carImages로 수정하기 */}
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
              <p className="legend">{index + 1}. {image}</p>
            </div>
          ))}
        </StyledCarousel>
        {showModal && (
          <StyleMyCarInfoCarousels>
            <div className="modal">
              <div
                className="modal-content"
                onClick={() => setShowModal(false)}
              >
                <img src={selectedImage} alt="modal" />
              </div>
            </div>
          </StyleMyCarInfoCarousels>
        )}
        {/* 디테일 정보  */}
        <StyledTableMyCarInfoContainer>
          <StyleTableDivMyCarInfoDetail>
            <StyleTableCarImgDiv>
              {/* 받아온 이미지 중 첫번째 이미지 */}
              <img src={images[0]} alt='대표 이미지'/>
            </StyleTableCarImgDiv>
            <StyleTableCarMakerModelDiv>
              {/* 제조사, 차량모델 */}
              <span>{carInfoData.maker}</span>
              <span>{carInfoData.modelNm}</span>
            </StyleTableCarMakerModelDiv>
            <StyleTableCarRegNmDiv>
              {/* 차량번호 */}
              <span>{carInfoData.regNm}</span>
            </StyleTableCarRegNmDiv>
            <StyleTableCarVinDiv>
              {/* 차대번호 */}
              <div>차대번호</div>
              <div>{carInfoData.vin}</div>
            </StyleTableCarVinDiv>
            <StyleTableCarInfoDiv>
              {/* 나머지 테이블 정보 */}
              <Table>
                <tbody>
                  <TableRow>
                    <TableCell align="center">{`주행거리(km)`}</TableCell>
                    <TableCell align="center">{`연식(년)`}</TableCell>
                    <TableCell align="center">차량등록일자</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">{carInfoData.mileage === undefined ? null : carInfoData.mileage.toLocaleString()}</TableCell>
                    <TableCell align="center">{carInfoData.modelYear}</TableCell>
                    <TableCell align="center">{carInfoData && carInfoData.regDt && carInfoData.regDt.slice(0, 10)}</TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </StyleTableCarInfoDiv>
          </StyleTableDivMyCarInfoDetail>
        </StyledTableMyCarInfoContainer>
      </StyleMyCarInfoDetailContainerDiv>
      {/* <img src={`${CARBORN_SITE}/images/2023-04-03T07-14-07.747757767_7293.png`} /> */}
    </StyleMyCarInfoDetailDiv>
  );
};

export default MyCarInfoDetail;
