/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { DetailData } from "../VehiclePurchaseDetailType";
import { titleStyle } from "./CarModel";

const inputBoxStyle = css`
  width: 98.8%;
  height: auto;
  margin-top: 1vh;
  margin-bottom: 1vh;
  border: 1px solid #bebebe;
  font-size: 0.8rem;
  background-color: white;
  border-left: transparent;
  border-top: transparent;
  border-right: transparent;
  resize: none;
`;

function CarContent({ data }: DetailData) {
  return (
    <div>
      <span css={titleStyle}>판매 내용</span>
      <textarea css={inputBoxStyle} value={data.content} disabled={true} />
    </div>
  );
}
export default CarContent;
