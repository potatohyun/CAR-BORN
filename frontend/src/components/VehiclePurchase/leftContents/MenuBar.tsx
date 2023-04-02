/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import SearchBar from "./SearchBar";
import SearchFilter from "./SearchFilter";

const leftContent = css`
  width: 15vw;
`;

const leftOuter = css`
  height: 40%;
  width: 20vw;
  position: fixed;
  top: 45.3%;
  left: 1vw;
  border: 1px black solid;
`;

function MenuBar() {
  return (
    <div css={leftContent}>
      <div css={leftOuter}>
        <SearchBar />
        <SearchFilter />
      </div>
    </div>
  );
}

export default MenuBar;
