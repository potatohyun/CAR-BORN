import axios from "axios";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

// 다른 디렉토리에서 임포트
import Nav from "../../Nav";
import { API_URL, CARBORN_SITE } from "./../../../lib/api";
import { createInspectorReviewAction } from './../../../modules/createReviewModule';

// 이미지 캐러셀용
// CarStatus 이미지 import 해오기
import Before from "../../../assets/carousel/CarStatus1.jpg";
import After from "../../../assets/carousel/CarStatus2.jpg";
import Document from "../../../assets/carousel/CarStatus4.jpg";

const StyleMyInspectorDetailDiv = styled.div`
  width: 100vw;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyleMyInspectorDetailContainerDiv = styled.div`
  margin-top: 4rem;
  margin-bottom: 4rem;
  width: 80%;
  border: 1px solid black;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding-top: 3rem;
`;

const StyleMyInspectorDetailTitleDiv = styled.div`
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

const StyleInspectorImg = styled.img`
  width: 100%;
`;

const StyleMyInspectorResultDiv = styled.div`
  width: 80vw;
  height: 50vh;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #adadad;
`;

const StyleMyInspectorReviewDiv = styled.div`
  margin-top: 3rem;
  width: 100%;
  height: 50vh;
  border: 1px solid black;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
`;

const StyleMyInspectorReviewStarDiv = styled.div`
  margin-left: 2rem;
  display: flex;
`;

const StyleMyInspectorReviewContentDiv = styled.div`
  margin-left: 2rem;
  display: flex;
  flex-direction: column;
`;

const StyleGetMyInspectorReviewDiv = styled.div`
  width: 100%;
  height: 30vh;
  margin-left: 2rem;
  border: 1px solid black;
`;

export type inspectorResultType = {
  setInspectorResult: React.SetStateAction<any[]>;
  inspectorResult: any;
};

export type reviewInputType = {
  reviewInput: number | readonly string[] | undefined;
  setReviewInput: React.Dispatch<
    React.SetStateAction<string | number | readonly string[] | undefined>
  >;
};

const MyInspectorDetail = () => {
  const param = useParams();
  const carId = param.carId;
  
  const location = useLocation();
  const dispatch = useDispatch();
  // 게시글 id 받아오기
  const detail = location.state;
  console.log(detail)
  console.log(detail.id)
  
  const ReviewedData = useSelector((state: any) => state.createReviewReducer);
  const [before, setBefore] = useState<string>('');
  const [after, setAfter] = useState<string>('');
  const [document, setDocument] = useState<string>('');
  const [isInspectorReviews, setIsInspectorReviews] = useState<boolean>(false);
  const [inspectorResult, setInspectorResult] = useState<any>("");
  // 리뷰 가져오기용
  const [inspectorReviews, setInspectorReviews] = useState<any>("");

  // 검수 결과 보여주기 위한 데이터 가져오기.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: `${CARBORN_SITE}/api/user/inspect/result/${detail.id}`,
        });

        console.log(response.data.message.content)
        // setBefore(response.data.message.beforeImgNm)
        // setAfter(response.data.message.afterImgNm)
        // setDocument(response.data.message.receiptImgNm)
        // console.log(response.data.message.content)
        setInspectorResult(response.data.message);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    // console.log(inspectorResult);
    // 리뷰 들고올때, axios 요청은 userid, carid 둘다 줘야함.
    // const getData = async () => {
    //   try {
    //     const response = await axios({
    //       method: "GET",
    //       url: `${CARBORN_SITE}/inspectorreviewwrite`,
    //     });
    //     setInspectorReviews(response.data[response.data.length-1]);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // getData();
  }, [detail, ReviewedData, dispatch, carId, setIsInspectorReviews]);

  // useEffect(() => {
  //   if (inspectorReviews) {
  //     setIsInspectorReviews(true)
  //   } else {
  //     setIsInspectorReviews(false)
  //   }
  // }, [inspectorReviews, setIsInspectorReviews])

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

  // DB로 작성 내용 보내기
  // const createReview = () => {
  //   dispatch(createInspectorReviewAction({ reviewInput, rating, carId }));
  // };

  return (
    <StyleMyInspectorDetailDiv>
      <Nav />
      <StyleMyInspectorDetailContainerDiv>
        <StyleMyInspectorDetailTitleDiv>
          <span>정비(검수) 상세 내역</span>
        </StyleMyInspectorDetailTitleDiv>
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
              <td>{detail.carModelNm}</td>
              {/* <td>{detail.manufacturer}</td> */}
              <td>{detail.carMileage}</td>
              <td>{detail.carRegNm}</td>
              <td>{detail.carModelYear}</td>
              <td>
                {detail.bookDt === null
                  ? "-"
                  : detail.bookDt}
              </td>
              {/* <td>
                {detail.lastMaintenanceDate === null
                  ? "-"
                  : detail.lastMaintenanceDate}
              </td> */}
              <td>{detail.bookStatus}</td>
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
                {/* <StyleInspectorImg src={`${CARBORN_SITE}/images/${before}`} alt="before" /> */}
                <StyleInspectorImg src={Before} alt="before" />
              </td>
              <td>
                {/* <StyleInspectorImg src={`${CARBORN_SITE}/images/${after}`} alt="After" /> */}
                <StyleInspectorImg src={After} alt="After" />
              </td>
              <td>
                {/* <StyleInspectorImg src={`${CARBORN_SITE}/images/${document}`} alt="Document" /> */}
                <StyleInspectorImg src={Document} alt="Document" />
              </td>
            </tr>
          </tbody>
        </table>
        {/* 검수 결과 */}
        <div>
          <p>정비 결과</p>
          <StyleMyInspectorResultDiv>
            {inspectorResult.content}
          </StyleMyInspectorResultDiv>
        </div>
        {/* 리뷰 작성 및 조회 */}
        {/* <StyleMyInspectorReviewDiv>
        {!isInspectorReviews ? <div>
            <StyleMyInspectorReviewStarDiv>
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
            </StyleMyInspectorReviewStarDiv>
            <StyleMyInspectorReviewContentDiv>
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
            </StyleMyInspectorReviewContentDiv>
          </div> :
          <StyleGetMyInspectorReviewDiv>
            <span>평점</span>
            <span style={{ color: "gold" }}>
              {`★`.repeat(inspectorReviews.rating)}
            </span>
            <p>{inspectorReviews.reviewInput}</p>
          </StyleGetMyInspectorReviewDiv>}
        </StyleMyInspectorReviewDiv> */}
      </StyleMyInspectorDetailContainerDiv>
    </StyleMyInspectorDetailDiv>
  );
};

export default MyInspectorDetail;

