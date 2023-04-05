/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import {
  Props,
  RegistrationInfo,
} from "../../../routes/userUseFnc/MyVehicleRegistration";
import { inputBoxStyle, titleStyle } from "./ManufacturingCompany";

function VehicleIdentificationNumber({
  setRegistrationInfo,
}: Props<React.Dispatch<React.SetStateAction<Partial<RegistrationInfo>>>>) {
  const inputTyping = (e: React.FocusEvent<HTMLInputElement>): void => {
    const inputValue = e.target.value;
    setRegistrationInfo((registrationInfo) => {
      return {
        ...registrationInfo,
        vehicleIdentificationNumber: inputValue,
      };
    });
  };

  return (
    <div>
      <span css={titleStyle}>차대번호</span>
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

export default VehicleIdentificationNumber;
