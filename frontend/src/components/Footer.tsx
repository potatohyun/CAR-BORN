/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Logo from "../assets/Logo.png";

const container = css`
  height: 20vh;
  width: 100%;
  background-color: black;
  color: white;
  display: flex;
  position: relative;
  .section1 {
    flex: 3;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .section2 {
    flex: 3;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .section3 {
    flex: 2;
  }
`;

export default function Footer() {
  return (
    <div css={container}>
      <div className="section1">
        <img src={Logo} alt="logo" height="90%" width="auto" />
      </div>
      <div className="section3"></div>
      <div className="section2">
        <div>carborn123@gmail.com</div>
        <div>서울특별시 강남구 역삼동 테헤란로 212</div>
        <div>©Copyright 2023 Car Born</div>
      </div>
    </div>
  );
}
