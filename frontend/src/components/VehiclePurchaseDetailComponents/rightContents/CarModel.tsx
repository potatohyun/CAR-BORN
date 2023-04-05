/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { DetailData } from "../VehiclePurchaseDetailType";

export const titleStyle = css`
  font-weight: 900;
`;

export const inputBoxStyle = css`
  width: 98.8%;
  height: 5vh;
  margin-bottom: 5vh;
  border: 1px solid #bebebe;
  font-size: 0.8rem;
  border-top: transparent;
  border-left: transparent;
  border-right: transparent;
  background-color: white;
`;

function CarModel({ data }: DetailData) {
  return (
    <div>
      <span css={titleStyle}>제조사 / 차량 모델</span>
      <input
        css={inputBoxStyle}
        value={`${data.carMaker} / ${data.carModelNm}`}
        disabled={true}
      />
    </div>
  );
}

export default CarModel;
