/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { DataType } from "./SaleInfoArea";

export const titleStyle = css`
  font-weight: 900;
`;

export const inputBoxStyle = css`
  width: 98.8%;
  height: 5vh;
  margin-bottom: 2vh;
  border: 1px solid #bebebe;
  font-size: 0.8rem;
  border-top: transparent;
  border-left: transparent;
  border-right: transparent;
  background-color: white;
`;

function SaleManufacturingCompany({ data }: DataType) {
  return (
    <div>
      <span css={titleStyle}>제조사 / 차량모델</span>
      <div>
        <input
          css={inputBoxStyle}
          disabled={true}
          value={`${data.maker} / ${data.modelNm}`}
        />
      </div>
    </div>
  );
}

export default SaleManufacturingCompany;
