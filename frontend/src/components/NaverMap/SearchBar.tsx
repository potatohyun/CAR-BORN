interface SearchBarType {
  index: number;
  item: any;
  searchBarItemClick: (index: number) => void;
}

function SearchBar({ index, item, searchBarItemClick }: SearchBarType) {
  return (
    <div
      style={{
        marginBottom: "5vh",
        cursor: "pointer",
        backgroundColor: "white",
      }}
      onClick={() => searchBarItemClick(index)}
    >
      <p
        style={{
          fontSize: "1.2rem",
          marginBottom: "0",
          fontWeight: "bolder",
        }}
      >
        {item?.NAME}
      </p>
      <p
        style={{
          marginTop: "0",
          color: "#E00000",
          fontWeight: "bolder",
        }}
      >
        {item.avg_point}
        <span>★</span>
        <span style={{ color: "#BBBBBB", fontSize: "0.9rem" }}>
          {" "}
          리뷰 {item?.cntReview}
        </span>
      </p>
      <p
        style={{
          marginBottom: "0",
          color: "#606060",
          fontSize: "0.9rem",
        }}
      >
        {item?.ADDRESS}
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
        {item?.PHONE_NO}
      </p>
      <div
        style={{
          border: "0.8px solid #C1C1C1",
          opacity: "0.3",
          width: "80%",
        }}
      ></div>
    </div>
  );
}

export default SearchBar;
