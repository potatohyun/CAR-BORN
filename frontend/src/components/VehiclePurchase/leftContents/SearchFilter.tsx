import ManufacturingFilter from "./ManufacturingFilter";

function SearchFilter() {
  return (
    <div>
      <span>필터</span>
      <hr
        style={{
          width: "20%",
          marginLeft: "2%",
          background: "red",
          height: "1px",
        }}
      />
      <div>
        <ManufacturingFilter />
      </div>
    </div>
  );
}

export default SearchFilter;
