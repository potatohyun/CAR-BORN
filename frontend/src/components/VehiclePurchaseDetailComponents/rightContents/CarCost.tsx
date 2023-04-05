/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { DetailData } from "../VehiclePurchaseDetailType";
import { inputBoxStyle, titleStyle } from "./CarModel";

function CarCost({ data }: DetailData) {
  return (
    <div>
      <span css={titleStyle}>가격</span>
      <input
        css={inputBoxStyle}
        value={`${data.price.toLocaleString("ko-KR")}원`}
        disabled={true}
      />
    </div>
  );
}

export default CarCost;
