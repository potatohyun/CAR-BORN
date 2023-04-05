/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const container = css`
  font-weight: 900;
  font-size: 2rem;
  text-align: center;
  margin-top: 50%;
`;

function NoCarList() {
  return <div css={container}>검색 결과가 없습니다.</div>;
}

export default NoCarList;
