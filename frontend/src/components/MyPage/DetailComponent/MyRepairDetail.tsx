import axios from "axios";
import styled from "@emotion/styled";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

// 다른 디렉토리에서 임포트
import Nav from "./../../Nav";
import { API_URL, CARBORN_SITE } from "./../../../lib/api";
import { createRepairReviewAction } from "../../../modules/createReviewModule";

// 이미지 캐러셀용
// CarStatus 이미지 import 해오기
import Before from "../../../assets/carousel/CarStatus1.jpg";
import After from "../../../assets/carousel/CarStatus2.jpg";
import Document from "../../../assets/carousel/CarStatus4.jpg";

const StyleMyRepairDetailDiv = styled.div`
  width: 100vw;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyleMyRepairDetailContainerDiv = styled.div`
  margin-top: 4rem;
  margin-bottom: 4rem;
  width: 80%;
  border: 1px solid black;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding-top: 3rem;
`;

const StyleMyRepairDetailTitleDiv = styled.div`
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

const StyleRepairImg = styled.img`
  width: 100%;
`;

const StyleMyRepairResultDiv = styled.div`
  width: 80vw;
  height: 50vh;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #adadad;
`;

const StyleMyRepairReviewDiv = styled.div`
  margin-top: 3rem;
  width: 100%;
  height: 50vh;
  border: 1px solid black;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
`;

const StyleMyRepairReviewStarDiv = styled.div`
  margin-left: 2rem;
  display: flex;
`;

const StyleMyRepairReviewContentDiv = styled.div`
  margin-left: 2rem;
  display: flex;
  flex-direction: column;
`;

const StyleGetMyRepairReviewDiv = styled.div`
  width: 100%;
  height: 30vh;
  margin-left: 2rem;
  border: 1px solid black;
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
  const param = useParams();
  const carId = param.carId;

  const location = useLocation();
  const dispatch = useDispatch();
  const detail = location.state;
  console.log(detail);
  console.log(detail.id);

  const ReviewedData = useSelector((state: any) => state.createReviewReducer);
  const [before, setBefore] = useState<string>("");
  const [after, setAfter] = useState<string>("");
  const [document, setDocument] = useState<string>("");
  const [isRepairReviews, setIsRepairReviews] = useState<boolean>(false);
  const [repairResult, setRepairResult] = useState<any>("");
  // 리뷰 가져오기용
  const [repairReviews, setRepairReviews] = useState<any>("");

  // 검수 결과 보여주기 위한 데이터 가져오기.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: `${CARBORN_SITE}/api/user/repair/result/${detail.id}`,
        });

        // 이미지 받아오기 용
        // setBefore(response.data.message.beforeImgNm)
        // setAfter(response.data.message.afterImgNm)
        // setDocument(response.data.message.receiptImgNm)
        setRepairResult(response.data.message);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();

    // 리뷰 들고올때, axios 요청은 userid, carid 둘다 줘야함.
    // const getData = async () => {
    //   try {
    //     const response = await axios({
    //       method: "GET",
    //       url: `${API_URL}/repairreviewwrite`,
    //     });
    //     setRepairReviews(response.data[response.data.length-1]);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // getData();
  }, [location.state, ReviewedData, dispatch, carId, setRepairReviews]);

  // useEffect(() => {
  //   if (repairReviews) {
  //     setIsRepairReviews(true)
  //   } else {
  //     setIsRepairReviews(false)
  //   }
  // }, [setIsRepairReviews, repairReviews])

  // 리뷰달기 버튼 활성화 및 textarea 값 보여주기
  const [reviewInput, setReviewInput] = useState<string>("");
  // const [isReview, setIsReview] = useState<Boolean>(false);

  // 입력하기
  // const handleReviewRegister = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   const { value } = e.currentTarget;
  //   setReviewInput(value);
  //   if (value.length >= 30) {
  //     setIsReview(true);
  //   }
  // };

  // 평점만들기
  // const [rating, setRating] = useState(1);
  // const starArr = [1, 2, 3, 4, 5];

  // const handleStarClick = (value: number) => {
  //   setRating(value);
  // };

  // // DB로 작성 내용 보내기
  // const createReview = () => {
  //   dispatch(createRepairReviewAction({ reviewInput, rating, carId }));
  // };

  return (
    <StyleMyRepairDetailDiv>
      <Nav />
      <StyleMyRepairDetailContainerDiv>
        <StyleMyRepairDetailTitleDiv>
          <span>정비(검수) 상세 내역</span>
        </StyleMyRepairDetailTitleDiv>
        {/* 디테일 정보  */}
        <table>
          <thead>
            <tr>
              <th>차량모델</th>
              {/* <th>제조사</th> */}
              <th>{`주행거리(km)`}</th>
              <th>차량번호</th>
              <th>{`연식(년)`}</th>
              <th>검수예약신청일</th>
              {/* <th>검수완료일</th> */}
              <th>검수상태</th>
              {/* <th>검수업체</th> */}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{detail.repairBookCarModelNm}</td>
              {/* <td>{detail.manufacturer}</td> */}
              <td>{detail.mileage}</td>
              <td>{detail.repairBookCarRegNm}</td>
              <td>{detail.repairBookCarModelYear}</td>
              <td>
                {detail.repairDt === null ? "-" : detail.repairDt.slice(0, 10)}
              </td>
              {/* <td>
                {detail.lastMaintenanceDate === null
                  ? "-"
                  : detail.lastMaintenanceDate}
              </td> */}
              <td>{detail.repairBookBookStatus}</td>
              {/* <td>
                {detail.maintenanceCompany === null
                  ? "-"
                  : detail.maintenanceCompany}
              </td> */}
            </tr>
          </tbody>
        </table>
        {/* 검수 전 이미지, 검수 후 이미지, 견적서 이미지 */}
        <table>
          <thead>
            <tr>
              <th>수리전</th>
              <th>수리후</th>
              <th>견적서</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <StyleRepairImg src={Before} alt="before" />
              </td>
              <td>
                <StyleRepairImg src={After} alt="After" />
              </td>
              <td>
                <StyleRepairImg src={Document} alt="Document" />
              </td>
            </tr>
          </tbody>
        </table>
        {/* 검수 결과 */}
        <div>
          <p>정비 결과</p>
          <StyleMyRepairResultDiv>
            {repairResult.content}
          </StyleMyRepairResultDiv>
        </div>
        {/* 리뷰 작성 및 조회 */}
        {/* <StyleMyRepairReviewDiv>
        {!isRepairReviews? <div>
            <StyleMyRepairReviewStarDiv>
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
            </StyleMyRepairReviewStarDiv>
            <StyleMyRepairReviewContentDiv>
              <span>
                상세 조회{" "}
                {`(현재 작성 글자 수: ${
                  typeof reviewInput === "string" ? reviewInput.length : 0
                }자)`}
              </span>
              <textarea
                name="opinion"
                cols={parseInt("100")}
                rows={parseInt("8")}
                placeholder="정비 및 검수에 대한 리뷰를 남겨주세요.(30자이상)"
                onChange={(e) => handleReviewRegister(e)}
                value={reviewInput as string}
              ></textarea>
              <button disabled={!isReview} onClick={createReview}>
                리뷰 달기
              </button>
            </StyleMyRepairReviewContentDiv>
          </div> : 
          <StyleGetMyRepairReviewDiv>
            <span>평점</span>
            <span style={{ color: "gold" }}>
              {`★`.repeat(repairReviews.rating)}
            </span>
            <p>{repairReviews.reviewInput}</p>
          </StyleGetMyRepairReviewDiv>}
        </StyleMyRepairReviewDiv> */}
      </StyleMyRepairDetailContainerDiv>
    </StyleMyRepairDetailDiv>
  );
};

export default MyRepairDetail;
