interface Props {
  markerNum: number;
  markerArr: any[];
}

function MarkerDetailInfo({ markerNum, markerArr }: Props) {
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
        {markerArr[markerNum]?.avg_point}
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
        (우) 39301 (지번) 원평동 1008-1
      </p>
      <p
        style={{
          marginTop: "0",
          color: "#038400",
          fontSize: "1rem",
          fontWeight: "bold",
        }}
      >
        {markerArr[markerNum]?.PHONE_NO}
      </p>
    </>
  );
}

export default MarkerDetailInfo;
