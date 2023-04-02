import styled from "@emotion/styled";
import Nav from "./../../Nav";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

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
import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { CARBORN_SITE } from "../../../lib/api";

export const StyledTableContainer = styled(TableContainer)`
  width: 70rem;
`

export const StyledTableHead = styled(TableHead)`
  background-color: #d23131;
  
  & .MuiTableCell-head {
    color: white;
    font-weight: bold;
    text-align: center; /* 가운데 정렬 적용 */
  }
`;

export const StyleMainTableHead = styled(TableHead)`
  & .MuiTableCell-head {
    font-weight: bold;
    text-align: center;
  }
`

const StyledCarousel = styled(Carousel)`
  max-width: 40%;
  margin: 0 auto;
`;

// 여기까지 MUI랑 캐러셀 작업

const StyleMyCarInfoDetailDiv = styled.div`
  width: 100vw;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyleMyCarInfoDetailContainerDiv = styled.div`
  margin-top: 4rem;
  margin-bottom: 4rem;
  width: 80%;
  border: 1px solid black;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding-top: 3rem;
`;

const StyleMyCarInfoDetailTitleDiv = styled.div`
  width: 50%;
  height: 5rem;
  border-bottom: 2px solid red;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    font-size: 2rem;
    font-weight: 900;
  }
`;

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

export type insuranceResultType = {
  setInspectorResult: React.SetStateAction<any[]>;
  inspectorResult: any;
};

const MyCarInfoDetail = () => {
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
    const fetchData = async (carId:string|number|undefined) => {
      try {
        const response = await axios({
          method: 'GET',
          url: `${CARBORN_SITE}/api/user/car/${carId}`
        })
        console.log(response.data.message.detail)
        setCarInfoData(response.data.message.detail)
        return response.data.message.content
      } catch (error) {
        console.log(error)
      }
    }
    fetchData(carId);
  }, [])

  return (
    <StyleMyCarInfoDetailDiv>
      <Nav />
      <StyleMyCarInfoDetailContainerDiv>
        <StyleMyCarInfoDetailTitleDiv>
          <span>내 차량 상세 정보</span>
        </StyleMyCarInfoDetailTitleDiv>
        {/* 디테일 정보  */}
        <br/>
        <StyledTableContainer>
          <Table>
            <StyledTableHead>
              <TableRow>
                <TableCell>차량모델</TableCell>
                <TableCell>제조사</TableCell>
                <TableCell>차량번호</TableCell>
                <TableCell>차대번호</TableCell>
                <TableCell>{`주행거리(km)`}</TableCell>
                <TableCell>{`연식(년)`}</TableCell>
                <TableCell>차량등록일자</TableCell>
              </TableRow>
            </StyledTableHead>
            <StyleMainTableHead>
              <TableRow>
                <TableCell>{carInfoData.modelNm}</TableCell>
                <TableCell>{carInfoData.maker}</TableCell>
                <TableCell>{carInfoData.regNm}</TableCell>
                <TableCell>{carInfoData.vin}</TableCell>
                <TableCell>{carInfoData.mileage}</TableCell>
                <TableCell>{carInfoData.modelYear}</TableCell>
                <TableCell>{carInfoData.regDt}</TableCell>
              </TableRow>
            </StyleMainTableHead>
          </Table>
        </StyledTableContainer>
        {/* 검수 전 이미지, 검수 후 이미지, 견적서 이미지 */}
        <br />
        <table>
          <tbody>
            <tr>
              <td>
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
                        <p className="legend">{index + 1}. 내 차량 정보</p>
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
              </td>
            </tr>
          </tbody>
        </table>
      </StyleMyCarInfoDetailContainerDiv>
    </StyleMyCarInfoDetailDiv>
  );
};

export default MyCarInfoDetail;
