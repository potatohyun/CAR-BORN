import SearchSort from "./SearchSort";

function SearchFilter() {
  return (
    <div>
      <span>정렬</span>
      <hr
        style={{
          width: "20%",
          marginLeft: "2%",
          background: "red",
          height: "1px",
        }}
      />
      <div>
        <SearchSort />
      </div>
    </div>
  );
}

export default SearchFilter;
