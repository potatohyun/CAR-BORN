/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { DataType } from "./SaleInfoArea";
import { inputBoxStyle, titleStyle } from "./SaleManufacturingCompany";

function SaleCarNumber({ data }: DataType) {
  return (
    <div>
      <span css={titleStyle}>차량 번호</span>
      <div>
        <input css={inputBoxStyle} disabled={true} value={`${data.regNm}`} />
      </div>
    </div>
  );
}
export default SaleCarNumber;
