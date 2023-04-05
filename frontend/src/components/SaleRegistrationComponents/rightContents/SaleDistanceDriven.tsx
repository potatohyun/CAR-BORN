/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { DataType } from "./SaleInfoArea";
import { inputBoxStyle, titleStyle } from "./SaleManufacturingCompany";

function SaleDistanceDriven({ data }: DataType) {
  const mileage = data.mileage.toLocaleString("ko-KR");
  return (
    <div>
      <span css={titleStyle}>주행거리</span>
      <div>
        <input css={inputBoxStyle} disabled={true} value={`${mileage}`} />
      </div>
    </div>
  );
}

export default SaleDistanceDriven;
