/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import CarList from "../../components/VehiclePurchase/rightContents/CarList";
import MenuBar from "../../components/VehiclePurchase/leftContents/MenuBar";
import { useEffect } from "react";
import Nav2 from "./../../components/Nav2";
import { useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { StateType } from "../../modules/carListModule";

const outer = css`
  width: 100%;
  display: flefx;
  justify-content: center;
  flex-direction: column;
  height: auto;
`;

const content = css`
  display: flex;
  align-items: center;
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
      </div>
    </>
  );
}

export default VehiclePurchase;
