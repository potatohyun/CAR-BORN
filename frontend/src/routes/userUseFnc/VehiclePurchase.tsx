/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import CarList from "../../components/VehiclePurchase/rightContents/CarList";
import MenuBar from "../../components/VehiclePurchase/leftContents/MenuBar";
import { useEffect } from "react";
import Nav2 from "./../../components/Nav2";
import { useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { StateType } from "../../modules/carListModule";
import SpeedDialComponent from "./../../components/VehiclePurchase/SpeedDialComponent";
import Footer from "../../components/Footer";

const outer = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: auto;
  margin-top: 8vh;
  position: relative;
`;

const content = css`
  display: flex;
  justify-content: space-evenly;
`;

function VehiclePurchase() {
  const queryClient = useQueryClient();
  const { sortType } = useSelector(
    ({ carListReducer }: { carListReducer: StateType }) => carListReducer
  );

  useEffect(() => {
    queryClient.fetchQuery("infinity-scroll");
  }, [sortType]);

  return (
    <>
      <Nav2 />
      <div css={outer}>
        <div css={content}>
          {/* 왼쪽 메뉴바 */}
          <MenuBar />
          {/* 오른쪽 컨텐츠 */}
          <CarList />
        </div>

        <div
          css={{
            position: "fixed",
            right: "0",
            bottom: "0",
            height: "100px",
            width: "100px",
            zIndex: "3",
          }}
        >
          {/* 스피드 다이얼 */}
          <SpeedDialComponent />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default VehiclePurchase;
