/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import HomeCarModel from "../../components/UserHome/HomeCarModel";
import HomeIconMenu from "../../components/UserHome/HomeIconMenu";
import HomeMainMenu from "../../components/UserHome/HomeMainMenu";
import HomeCarForSales from "../../components/UserHome/HomeCarForSales";
import HomeWhyCooseUs from "../../components/UserHome/HomeWhyChooseUs";
import HomeCarsInfo from "../../components/UserHome/HomeCarsInfo";
import Nav2 from "../../components/Nav2";

const container = css`
  position: absolute;
  top: 15.5vh;
  z-index: 3;
  width: 100%;
`;

export default function UserHome() {
  return (
    <>
      <Nav2 />
      <div css={container}>
        <HomeCarModel />
        <HomeIconMenu />
        <HomeMainMenu />
        <HomeCarForSales />
        <HomeWhyCooseUs />
        <HomeCarsInfo />
      </div>
    </>
  );
}
