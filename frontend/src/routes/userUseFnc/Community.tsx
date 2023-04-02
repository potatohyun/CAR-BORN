/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import CommunityLeftContent from "./../../components/community/leftContent/CommunityLeftContent";
import CommunityRightContent from "./../../components/community/rightContent/CommunityRightContent";
import Nav2 from "./../../components/Nav2";

const container = css`
  width: 70vw;
  height: 100vh;
  margin: 5vh auto;
  border: 1px solid black;
  display: flex;
  position: relative;
`;

const leftContent = css`
  border: 1px solid black;
  width: 18%;
  margin-right: 3%;
`;

const rightContent = css`
  display: flex;
  align-items: end;
  justify-content: center;
  border: 1px solid black;
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
