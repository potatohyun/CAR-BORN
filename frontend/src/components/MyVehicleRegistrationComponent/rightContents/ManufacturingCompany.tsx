/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import {
  Props,
  RegistrationInfo,
} from "../../../routes/userUseFnc/MyVehicleRegistration";

export const titleStyle = css`
  font-weight: 900;
`;

export const inputBoxStyle = css`
  width: 98.8%;
  margin-top: 1vh;
  height: 5vh;
  margin-bottom: 1vh;
  border: 1px solid #bebebe;
  &:focus {
    outline: none;
    border-color: #e00000;
  }
`;

function ManufacturingCompany({
  setRegistrationInfo,
}: Props<React.Dispatch<React.SetStateAction<Partial<RegistrationInfo>>>>) {
  const inputTyping = (e: React.FocusEvent<HTMLInputElement>): void => {
    const inputValue = e.target.value;
    setRegistrationInfo((registrationInfo) => {
      return {
        ...registrationInfo,
        manufacturingCompany: inputValue,
      };
    });
  };

  return (
    <div>
      <span css={titleStyle}>제조사</span>
      <div>
        <input
          css={inputBoxStyle}
          type="text"
          autoComplete="false"
          onBlur={inputTyping}
        />
      </div>
    </div>
  );
}

export default ManufacturingCompany;
