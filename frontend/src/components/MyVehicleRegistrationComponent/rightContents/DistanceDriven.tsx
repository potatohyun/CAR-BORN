/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { Props } from "../../../routes/userUseFnc/MyVehicleRegistration";
import { RegistrationInfo } from "./../../../routes/userUseFnc/MyVehicleRegistration";
import { inputBoxStyle, titleStyle } from "./ManufacturingCompany";

function DistanceDriven({
  setRegistrationInfo,
}: Props<React.Dispatch<React.SetStateAction<Partial<RegistrationInfo>>>>) {
  const inputTyping = (e: React.FocusEvent<HTMLInputElement>): void => {
    const inputValue = e.target.value;
    setRegistrationInfo((registrationInfo) => {
      return {
        ...registrationInfo,
        distanceDriven: Number(inputValue),
      };
    });
  };

  return (
    <div>
      <span css={titleStyle}>주행거리(km)</span>
      <div>
        <input
          css={inputBoxStyle}
          type="number"
          placeholder="0"
          min="0"
          onBlur={inputTyping}
        />
      </div>
    </div>
  );
}

export default DistanceDriven;
