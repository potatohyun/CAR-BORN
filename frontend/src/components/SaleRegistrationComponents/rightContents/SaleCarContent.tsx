/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { titleStyle } from "../../MyVehicleRegistrationComponent/rightContents/ManufacturingCompany";

import { SaleInfoContentsType, SaleInfoType } from "./SaleInfoArea";

const inputBoxStyle = css`
  width: 98.8%;
  margin-top: 1vh;
  height: 13vh;
  margin-bottom: 1vh;
  border: 1px solid #bebebe;
  &:focus {
    outline: none;
    border-color: #e00000;
  }
  resize: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

function SaleCarContent({
  setSaleInfo,
}: Pick<SaleInfoContentsType, "setSaleInfo">) {
  const getTyping = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;

    setSaleInfo((saleInfo: SaleInfoType) => {
      return { ...saleInfo, content: inputValue };
    });
  };
  return (
    <>
      <span css={titleStyle}>판매내용</span>
      <div>
        <textarea css={inputBoxStyle} onBlur={getTyping}></textarea>
      </div>
    </>
  );
}

export default SaleCarContent;
