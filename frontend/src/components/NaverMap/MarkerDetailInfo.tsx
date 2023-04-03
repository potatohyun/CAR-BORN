import { useQueryClient } from "react-query";
import { QueryState } from "react-query/types/core/query";
import { usePhoneNum } from "../../hooks/usePhoneNum";
import { MarkerType } from "../../routes/userUseFnc/NaverMap";

interface Props {
  markerNum: number;
  markerArr: MarkerType[];
}

function MarkerDetailInfo({ markerNum, markerArr }: Props) {
  const queryClient = useQueryClient();
  const hipenPhoneNum = usePhoneNum(markerArr[markerNum]?.PHONE_NO);

  const addressQuery: QueryState<any, Error> | undefined =
    queryClient.getQueryState(["get-jibun-address", markerNum]);

  const jibun = addressQuery?.data.data.message.jibunAddress;
  const longName = addressQuery?.data.data.message.longName;

  let star: string = "";
  let blankStar: string = "";
  if (markerArr[markerNum]?.avg_point >= 4.5) {
    star = "★★★★★";
  } else if (markerArr[markerNum]?.avg_point >= 3.5) {
    star = "★★★★";
    blankStar = "☆";
  } else if (markerArr[markerNum]?.avg_point >= 2.5) {
    star = "★★★";
    blankStar = "☆☆";
  } else if (markerArr[markerNum]?.avg_point >= 1.5) {
    star = "★★";
    blankStar = "☆☆☆";
  } else if (markerArr[markerNum]?.avg_point >= 0.5) {
    star = "★";
    blankStar = "☆☆☆☆";
  } else {
    blankStar = "☆☆☆☆☆";
  }

  return (
    <>
      <p
        style={{
          fontSize: "1.2rem",
          marginBottom: "0",
          fontWeight: "bolder",
        }}
      >
        {markerArr[markerNum]?.NAME}
      </p>
      <p
        style={{
          marginTop: "0",
          color: "#E00000",
          fontWeight: "bolder",
        }}
      >
        {markerArr[markerNum]?.avg_point === 0
          ? markerArr[markerNum]?.avg_point
          : (markerArr[markerNum]?.avg_point).toFixed(1)}
        <span style={{ fontSize: "1.2rem", marginLeft: "1%" }}>
          {star}
          <span style={{ color: "#BBBBBB" }}>{blankStar}</span>
        </span>
        <span style={{ color: "#BBBBBB", fontSize: "0.9rem" }}>
          {" "}
          리뷰 {markerArr[markerNum]?.cntReview}
        </span>
      </p>
      <p
        style={{
          marginBottom: "0",
          color: "#606060",
          fontSize: "0.9rem",
        }}
      >
        {markerArr[markerNum]?.ADDRESS}
      </p>
      <p
        style={{
          margin: "0",
          color: "#C1C1C1",
          fontSize: "0.9rem",
        }}
      >
        (우) {longName}
      </p>
      <p
        style={{
          margin: "0",
          color: "#C1C1C1",
          fontSize: "0.9rem",
        }}
      >
        (지번) {jibun}
      </p>
      <p
        style={{
          marginTop: "0",
          color: "#038400",
          fontSize: "1rem",
          fontWeight: "bold",
        }}
      >
        {hipenPhoneNum}
      </p>
    </>
  );
}

export default MarkerDetailInfo;
