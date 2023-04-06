/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  inputBoxStyle,
  titleStyle,
} from "../../MyVehicleRegistrationComponent/rightContents/ManufacturingCompany";

import { SaleInfoContentsType, SaleInfoType } from "./SaleInfoArea";
import Swal from "sweetalert2";

function SaleCarCost({
  setSaleInfo,
}: Pick<SaleInfoContentsType, "setSaleInfo">) {
  const Toast = Swal.mixin({
    toast: true,
    showConfirmButton: true,
  });

  const getTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (parseInt(inputValue) > 1999999999) {
      Toast.fire({
        icon: "error",
        title: "21억원 이하로 작성해주세요.",
        timer: 1000,
        timerProgressBar: true,
      });
      e.target.value = "";
    } else {
      setSaleInfo((saleInfo: SaleInfoType) => {
        return { ...saleInfo, price: inputValue };
      });
    }
  };

  return (
    <>
      <span css={titleStyle}>차량 가격(만원)</span>
      <div>
        <input css={inputBoxStyle} type="number" min="0" onChange={getTyping} />
      </div>
    </>
  );
}

export default SaleCarCost;
