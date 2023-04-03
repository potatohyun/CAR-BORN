/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { Params, useParams } from "react-router-dom";

import Nav from "../../components/Nav";
import DetailThumnail from "../../components/VehiclePurchaseDetailComponents/leftContents/DetailThumnail";
import DetailInfomation from "../../components/VehiclePurchaseDetailComponents/rightContents/DetailInfomation";

const outer = css`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

const content = css`
  display: flex;
  align-items: center;
`;

function VehiclePurchaseDetail() {
  const { carId, id }: Readonly<Params<string>> = useParams();

  return (
    <>
      <Nav />
      <div css={outer}>
        <div css={content}>
          {/* 왼쪽 컨텐츠 */}
          <DetailThumnail />
          {/* 오른쪽 컨텐츠*/}
          <DetailInfomation carId={carId} id={id} />
        </div>
      </div>
    </>
  );
}
export default VehiclePurchaseDetail;
