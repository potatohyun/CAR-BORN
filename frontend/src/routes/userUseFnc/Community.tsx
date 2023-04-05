/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import CommunityLeftContent from "./../../components/community/leftContent/CommunityLeftContent";
import CommunityRightContent from "./../../components/community/rightContent/CommunityRightContent";
import Nav2 from "./../../components/Nav2";

const container = css`
  width: 70vw;
  height: 100vh;
  margin: 5vh auto;
  /* box-shadow: 0 0 10px rgba(000, 000, 000, 1); */
  border: 2px solid black;
  display: flex;
  position: relative;
`;

const leftContent = css`
  border: 2px solid black;
  width: 18%;
  margin-right: 3%;
`;

const rightContent = css`
  display: flex;
  align-items: end;
  justify-content: center;
  border: 2px solid black;
  width: 79%;
`;

function Community() {
  return (
    <>
      <Nav2 />
      <div css={container}>
        <div css={leftContent}>
          <CommunityLeftContent />
        </div>
        <div css={rightContent}>
          <CommunityRightContent />
        </div>
      </div>
    </>
  );
}

export default Community;
