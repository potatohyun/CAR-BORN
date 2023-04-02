function MarkerDetailReview({ data }: { data: any }) {
  const REG_DT = `${data?.regDt.slice(0, 4)}.${data?.regDt.slice(
    5,
    7
  )}.${data?.regDt.slice(8, 10)}`;
  const UPT_DT = `${data?.uptDt.slice(0, 4)}.${data?.uptDt.slice(
    5,
    7
  )}.${data?.uptDt.slice(8, 10)}`;

  return (
    <div>
      <p style={{ marginBottom: "0", fontWeight: "900" }}>{data?.accountId}</p>
      <p style={{ margin: "0", color: "#FF9600" }}>
        ★★★★★
        <span style={{ color: "#BBBBBB", fontSize: "0.7rem" }}>
          {data.regDt === data.uptDt ? REG_DT : UPT_DT}
        </span>
      </p>
      <span>{data?.content}</span>
      <hr style={{ marginTop: "7%", borderColor: "#C1C1C1", opacity: "0.2" }} />
    </div>
  );
}

export default MarkerDetailReview;
