/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

function SearchBar() {
  return (
    <div>
      <span>검색</span>
      <hr
        style={{
          width: "20%",
          marginLeft: "2%",
          background: "red",
          height: "1px",
        }}
      />
      <input type="text" style={{ width: "80%" }} placeholder="Search for..." />
      <button>검색</button>
    </div>
  );
}
export default SearchBar;
