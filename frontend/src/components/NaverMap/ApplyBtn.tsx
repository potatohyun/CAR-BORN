function ApplyBtn() {
  const getApply = () => {
    console.log("신청하기");
  };
  return (
    <>
      <button
        style={{
          backgroundColor: "red",
          width: "100%",
          height: "6vh",
          borderRadius: "10px",
          border: "0",
          fontSize: "1.1rem",
          fontWeight: "bolder",
          color: "white",
          cursor: "pointer",
          margin: "7% 0 0 0",
        }}
        onClick={getApply}
      >
        신청하기
      </button>
    </>
  );
}

export default ApplyBtn;
