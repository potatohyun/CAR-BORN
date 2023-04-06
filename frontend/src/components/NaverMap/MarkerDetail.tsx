/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { useEffect, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import MarkerDetailInfo from "./MarkerDetailInfo";
import MarkerDetailReview from "./MarkerDetailReview";
import { useAPI } from "./../../hooks/useAPI";
import { useQueries } from "react-query";
import { MarkerType } from "../../routes/userUseFnc/NaverMap";

const roadView = css`
  width: 100%;
  height: 50vh;
  background-color: red;
`;

const toggleBtn = ({ reviewBtn }: { reviewBtn: boolean }) => css`
  list-style: none;
  margin: 3% 0 0 0;
  padding: 0;
  border: 0;
  border-top: #555555 2px solid;
  display: flex;
  position: sticky;
  top: 0;
  background-color: #fafafa;
  cursor: pointer;

  li {
    flex: 1;
    border: 1px solid #cccccc;
    text-align: center;
    height: 4vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 900;
    font-size: 0.9rem;
    color: #555555;
  }
  li:nth-of-type(1) {
    background-color: ${!reviewBtn ? "white" : "#fafafa"};
    color: ${!reviewBtn ? "111111" : "#rgb(85,85,85)"};
    border-bottom: ${!reviewBtn ? "transparent" : "#cccccc 1px solid"};
  }
  li:nth-of-type(2) {
    background-color: ${reviewBtn ? "white" : "#fafafa"};
    color: ${reviewBtn ? "111111" : "#rgb(85,85,85)"};
    border-bottom: ${reviewBtn ? "transparent" : "#cccccc  1px solid"};
  }
`;

const arrow = css`
  border: 1px black solid;
  width: 50px;
  height: 50px;
  transform: rotate(45deg);
  left: 10%;
`;

const naver = window.naver;

interface Props {
  setReserve: React.Dispatch<React.SetStateAction<boolean>>;
  setMarkerNum: React.Dispatch<React.SetStateAction<number>>;
  searchInfoWindows: any;
  markerNum: number;
  markerArr: MarkerType[];
}

function MarkerDetail({
  setReserve,
  setMarkerNum,
  searchInfoWindows,
  markerNum,
  markerArr,
}: Props) {
  // 파노라마 생성 태그
  const roadViewRef = useRef<HTMLDivElement | null>(null);
  const [reviewBtn, setReviewBtn] = useState<boolean>(false);
  const ObjString: any = localStorage.getItem("login-token");

  const REVIEW_API = `https://carborn.site/api/user/map/review/${
    markerArr[markerNum]?.ID
  }/${markerArr[markerNum]?.AUTH}/${1}/${100}`;

  const getReviewAPI = useAPI("get", REVIEW_API, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(ObjString).value}`,
    },
  });

  const [{ data, refetch }] = useQueries([
    {
      queryKey: "get-review",
      queryFn: () => getReviewAPI,
      retry: false,
      select: (data: any) => {
        return data?.data?.message?.content;
      },
      keepPreviousData: true,
      cacheTime: 0,
      refetchOnWindowFocus: true,
      refetchOnMount: true,
    },
  ]);

  // 파노라마 옵션
  var panoramaOptions = {
    position: new naver.maps.LatLng(
      markerArr[markerNum]?.LAT,
      markerArr[markerNum]?.LNG
    ),
    // size: new naver.maps.Size(310, 350),
    pov: {
      pan: -75,
      tilt: 10,
      fov: 100,
    },
  };
  useEffect(() => {
    // 파노라마 생성
    if (roadViewRef.current) {
      var pano = new naver.maps.Panorama(roadViewRef.current, panoramaOptions);
    }
    refetch();
  }, [markerArr[markerNum]?.LAT, markerArr[markerNum]?.LNG]);

  // 나가기 버튼 클릭
  const exit = () => {
    setReserve(false);
    setMarkerNum(-1);
    searchInfoWindows[markerNum].close();
  };

  const watchInfo = () => {
    setReviewBtn(false);
  };
  const watchReview = () => {
    setReviewBtn(true);
  };

  return (
    <div
      style={{
        marginBottom: "5vh",
        backgroundColor: "white",
      }}
    >
      <CloseIcon
        style={{
          margin: "0 0 0.5% 92.5%",
          cursor: "pointer",
        }}
        onClick={exit}
      />
      <div css={roadView} ref={roadViewRef}></div>
      <ul css={toggleBtn({ reviewBtn })}>
        <li onClick={watchInfo}>업체정보</li>
        <li onClick={watchReview}>사용자 리뷰</li>
      </ul>
      {!reviewBtn ? (
        <MarkerDetailInfo markerNum={markerNum} markerArr={markerArr} />
      ) : (
        data.map((DATA: any, index: number) => {
          return (
            <>
              <MarkerDetailReview
                data={DATA}
                key={
                  DATA.accountId +
                  DATA.content +
                  DATA.point +
                  DATA.regDt +
                  DATA.uptDt
                }
              />
              {/* {index === data?.length - 1 ? <div css={arrow}></div> : null} */}
            </>
          );
        })
      )}
    </div>
  );
}

export default MarkerDetail;
