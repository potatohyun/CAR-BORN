import styled from "@emotion/styled";
import { Table, TableCell, TableRow } from "@mui/material";

// CarStatus 이미지 import 해오기
import carousel1 from "../../../assets/carousel/CarStatus1.jpg";
import carousel2 from "../../../assets/carousel/CarStatus2.jpg";
import carousel4 from "../../../assets/carousel/CarStatus4.jpg";

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
import { createRepairReviewAction } from "../../../modules/createReviewModule";

const StyleMyRepairDetailDiv = styled.div`
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

const StyledTableRepairContainer = styled.div`
  width: 70vw;
`;

const StyleMyRepairDetailContainerDiv = styled.div`
  width: 73vw;
  border: 1px dashed #00000020;
  margin-top: 15vh;
  margin-bottom: 15vh;
  background-color: #fffffff6;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(255, 255, 255, 1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 3rem;
  padding-left: 3rem;
  padding-right: 3rem;
`;

const StyleMyRepairDetailHeaderDiv = styled.div`
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
const StyleMainRepairDetailContainerDiv = styled.div`
  width: 72.5vw;
  height: 70vh;
  margin-top: 4rem;

  display: flex;
  justify-content: center;
`;

const StyleMyRepairLeftDetailDiv = styled.div`
  width: 34vw;
  height: 60vh;
  margin-top: -1.8rem;
  display: flex;
  justify-content: center;
`;

const StyleMyRepairRightDetailDiv = styled.div`
  width: 46vw;
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
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

export const StyleRepairDetailCarousels = styled.div`
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
  right: 10.5vw;
  top: 67vh;
  cursor: pointer;
`;

// 내 정비 정보 전체 컨테이너
const StyleTableDivRepairDetail = styled.div`
  border: 1px dashed #00000050;
  width: 41vw;
  height: 40vh;
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
const StyleTableRepairInfoDiv = styled.div`
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

// 정비내역
const StyleRepairResultContent = styled.div`
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
`;

// 리뷰
const StyleMyRepairReviewDiv = styled.div`
  width: 41.2vw;
  margin-top: 2vh;

  & > div > div {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
`;

const StyleMyRepairReviewContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1vh;
  margin-bottom: 6vh;

  span {
    display: flex;
    flex-direction: row;
  }

  textarea {
    resize: none;
  }
`;

const StyleGetMyRepairReviewResultContainer = styled.div`
  width: 39.4vw;
`;

const StyleGetMyRepairReviewDiv = styled.div`
  width: 24vw;
  padding: 2%;
  border: 1px dashed #00000060;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 5vh;
`;

export type repairResultType = {
  setRepairResult: React.SetStateAction<any[]>;
  repairResult: any;
};

export type reviewInputType = {
  reviewInput: number | readonly string[] | undefined;
  setReviewInput: React.Dispatch<
    React.SetStateAction<string | number | readonly string[] | undefined>
  >;
};

const MyRepairDetail = () => {
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

  useEffect(() => {
    // 이미지 url 배열
    const imgUrls = [carousel1, carousel2, carousel4];

    // 이미지 url 배열을 images state 변수에 추가
    setImages(imgUrls);
  }, []);

  // 데이터 관련
  const [repairResult, setRepairResult] = useState<any>("");

  // 리뷰 관련
  const [isReviewExist, setIsReviewExist] = useState<boolean>(false);
  const [repairReviews, setRepairReviews] = useState<any>("");

  // 검수 결과 보여주기 위한 데이터 가져오기.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: `${CARBORN_SITE}/api/user/repair/result/${resultid}`,
          headers: {
            Authorization: `Bearer ${accessToken}`,
            [ContentType]: applicationjson,
          },
        });
        // 이미지 받아오기 용
        setRepairResult(response.data.message);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [setRepairResult, resultid]);

  // 리뷰 들고올때, axios 요청은 userid, carid 둘다 줘야함.
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: `${CARBORN_SITE}/api/user/repair/result/review/${repairResult.id}`,
          headers: {
            Authorization: `Bearer ${accessToken}`,
            [ContentType]: applicationjson,
          },
        });

        // null 이거나 true
        if (response.data.message === null) {
          setIsReviewExist(false);
        } else {
          console.log(response.data.message);
          setIsReviewExist(true);
        }

        setRepairReviews(response.data.message);
      } catch (error) {
        console.log(error);
      }
    };

    if (repairResult.id !== undefined) {
      getData();
    }
  }, [repairResult.id, setIsReviewExist, setRepairResult]);

  // 리뷰달기 버튼 활성화 및 textarea 값 보여주기
  const [reviewInput, setReviewInput] = useState<string>("");
  const [isReview, setIsReview] = useState<Boolean>(false);

  // 입력하기
  const handleReviewRegister = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.currentTarget;
    setReviewInput(value);
    if (value.length >= 30) {
      setIsReview(true);
    }
  };

  // 평점만들기
  const [rating, setRating] = useState(1);
  const starArr = [1, 2, 3, 4, 5];

  const handleStarClick = (value: number) => {
    setRating(value);
  };

  // DB로 작성 내용 보내기
  const createReview = ({ reviewInput, rating, detailId }: any) => {
    dispatch(createRepairReviewAction({ reviewInput, rating, detailId }));
    setIsReviewExist(true);
  };

  // 뒤로가기
  const goBack = () => {
    window.history.back();
  };

  console.log(repairResult);

  return (
    <StyleMyRepairDetailDiv>
      <Nav2 />
      <StyleMyRepairDetailContainerDiv>
        <StyleXButton onClick={() => goBack()}>X</StyleXButton>
        <StyleMyRepairDetailHeaderDiv>
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
          <StyleTableRepairInfoDiv>
            {/* 나머지 테이블 정보 */}
            <Table>
              <tbody>
                <TableRow>
                  <TableCell align="center">{`정비업체`}</TableCell>
                  <TableCell align="center">{`주행거리(km)`}</TableCell>
                  <TableCell align="center">{`연식(년)`}</TableCell>
                  <TableCell align="center">정비예약일</TableCell>
                  <TableCell align="center">정비완료일</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">
                    {detail.repairShopAccountName === undefined
                      ? null
                      : detail.repairShopAccountName}
                  </TableCell>
                  <TableCell align="center">
                    {detail.carMileage === undefined
                      ? null
                      : detail.carMileage.toLocaleString()}
                  </TableCell>
                  <TableCell align="center">{detail.carModelYear}</TableCell>
                  <TableCell align="center">
                    {detail && detail.bookDt && detail.bookDt.slice(0, 10)}
                  </TableCell>
                  <TableCell align="center">
                    {repairResult &&
                      repairResult.repairDt &&
                      repairResult.repairDt.slice(0, 10)}
                  </TableCell>
                </TableRow>
              </tbody>
            </Table>
          </StyleTableRepairInfoDiv>
        </StyleMyRepairDetailHeaderDiv>
        {/* 밑에 메인 섹션 부분 */}
        <StyleMainRepairDetailContainerDiv>
          <StyleMyRepairLeftDetailDiv>
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
              <StyleRepairDetailCarousels>
                <div className="modal">
                  <div
                    className="modal-content"
                    onClick={() => setShowModal(false)}
                  >
                    <img src={selectedImage} alt="modal" />
                  </div>
                </div>
              </StyleRepairDetailCarousels>
            )}
          </StyleMyRepairLeftDetailDiv>
          <StyleMyRepairRightDetailDiv>
            <StyleTableDivRepairDetail>
              {repairResult &&
                repairResult.content &&
                repairResult.content.trim() && (
                  <StyleRepairResultContent>
                    {repairResult.content
                      .split("-")
                      .slice(1)
                      .map((content: any, index: any) => (
                        <li key={index}>{content}</li>
                      ))}
                  </StyleRepairResultContent>
                )}
            </StyleTableDivRepairDetail>
            {/* 리뷰 작성 및 조회 */}
            <StyleMyRepairReviewDiv>
              {!isReviewExist ? (
                <div>
                  <div>
                    <div>
                      <span>평점</span>
                      {starArr.map((star) => (
                        <span
                          key={star}
                          onClick={() => handleStarClick(star)}
                          style={{
                            color: star <= rating ? "gold" : "gray",
                            cursor: "pointer",
                          }}
                        >
                          ★
                        </span>
                      ))}
                      {rating}점
                    </div>
                    <div>
                      <span>
                        리뷰 작성{" "}
                        {`(현재 작성 글자 수: ${
                          typeof reviewInput === "string"
                            ? reviewInput.length
                            : 0
                        }자)`}
                      </span>
                    </div>
                  </div>
                  <StyleMyRepairReviewContentDiv>
                    <textarea
                      name="opinion"
                      rows={parseInt("5")}
                      placeholder="정비 및 검수에 대한 리뷰를 남겨주세요.(30자이상)"
                      maxLength={150}
                      onChange={(e) => handleReviewRegister(e)}
                      value={reviewInput as string}
                    ></textarea>
                    <button
                      disabled={!isReview}
                      onClick={() =>
                        createReview({
                          reviewInput,
                          rating,
                          detailId: repairResult.id,
                        })
                      }
                    >
                      리뷰 달기
                    </button>
                  </StyleMyRepairReviewContentDiv>
                </div>
              ) : (
                <StyleGetMyRepairReviewResultContainer>
                  {repairReviews && (
                    <StyleGetMyRepairReviewDiv>
                      <div>
                        <span>평점</span>
                        <span style={{ color: "gold" }}>
                          {`★`.repeat(repairReviews.point)}
                        </span>
                      </div>
                      <p>{repairReviews.content}</p>
                    </StyleGetMyRepairReviewDiv>
                  )}
                </StyleGetMyRepairReviewResultContainer>
              )}
            </StyleMyRepairReviewDiv>
          </StyleMyRepairRightDetailDiv>
        </StyleMainRepairDetailContainerDiv>
      </StyleMyRepairDetailContainerDiv>
    </StyleMyRepairDetailDiv>
  );
};

export default MyRepairDetail;
