/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { DetailData } from "../VehiclePurchaseDetailType";
import { inputBoxStyle, titleStyle } from "./CarModel";

function CarNumber({ data }: DetailData) {
  return (
    <div>
      <span css={titleStyle}>차량 번호</span>
      <input css={inputBoxStyle} value={data.carRegNm} disabled={true} />
    </div>
  );
}

export default CarNumber;
