/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { DetailData } from "../VehiclePurchaseDetailType";
import { inputBoxStyle, titleStyle } from "./CarModel";

function CarDistance({ data }: DetailData) {
  return (
    <div>
      <span css={titleStyle}>주행 거리(km)</span>
      <input
        css={inputBoxStyle}
        value={data.carMileage.toLocaleString("ko-KR")}
        disabled={true}
      />
    </div>
  );
}

export default CarDistance;
