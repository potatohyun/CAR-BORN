/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { DataType } from "./SaleInfoArea";
import { inputBoxStyle, titleStyle } from "./SaleManufacturingCompany";

function SaleCarYear({ data }: DataType) {
  return (
    <div>
      <span css={titleStyle}>연식</span>
      <div>
        <input
          css={inputBoxStyle}
          value={`${data.modelYear}`}
          disabled={true}
        />
      </div>
    </div>
  );
}

export default SaleCarYear;
