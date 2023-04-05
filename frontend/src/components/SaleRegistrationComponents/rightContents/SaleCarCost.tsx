/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  inputBoxStyle,
  titleStyle,
} from "../../MyVehicleRegistrationComponent/rightContents/ManufacturingCompany";

import { SaleInfoContentsType, SaleInfoType } from "./SaleInfoArea";

function SaleCarCost({
  setSaleInfo,
}: Pick<SaleInfoContentsType, "setSaleInfo">) {
  const getTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    setSaleInfo((saleInfo: SaleInfoType) => {
      return { ...saleInfo, price: inputValue };
    });
  };
  return (
    <>
      <span css={titleStyle}>차량가격</span>
      <div>
        <input css={inputBoxStyle} type="number" min="0" onBlur={getTyping} />
      </div>
    </>
  );
}

export default SaleCarCost;
