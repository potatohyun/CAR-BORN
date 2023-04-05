/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { searchContainer } from "./SearchBar";

import SearchSort from "./SearchSort";

function SearchFilter() {
  return (
    <div css={searchContainer}>
      <span className="span">정렬</span>
      <hr className="hr" />
      <div>
        <SearchSort />
      </div>
    </div>
  );
}

export default SearchFilter;
