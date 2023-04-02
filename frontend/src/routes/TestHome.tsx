function TestHome() {
  return (
    <div>
      <p
        style={{ fontSize: "1.5rem", marginBottom: "0", fontWeight: "bolder" }}
      >
        정비소
      </p>
      <p style={{ marginTop: "0", color: "#E00000", fontWeight: "bolder" }}>
        3.9
        <span>★★★★☆</span>
        <span style={{ color: "#BBBBBB", fontSize: "0.9rem" }}> 리뷰 15</span>
      </p>
      <p style={{ marginBottom: "0", color: "#606060", fontSize: "0.9rem" }}>
        경북 구미시 구미중앙로 76
      </p>
      <p style={{ margin: "0", color: "#C1C1C1", fontSize: "0.9rem" }}>
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
        1234-5678
      </p>
      <button
        style={{
          backgroundColor: "#2196F3",
          width: "80%",
          height: "7vh",
          borderRadius: "10px",
          border: "0",
          fontSize: "1rem",
          fontWeight: "bolder",
          color: "white",
          cursor: "pointer",
        }}
      >
        예약하기
      </button>
    </div>
  );
}

export default TestHome;
