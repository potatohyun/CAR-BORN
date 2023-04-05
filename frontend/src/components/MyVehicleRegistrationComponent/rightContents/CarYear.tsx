/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Props } from "../../../routes/userUseFnc/MyVehicleRegistration";
import { RegistrationInfo } from "./../../../routes/userUseFnc/MyVehicleRegistration";
import { titleStyle } from "./ManufacturingCompany";

const pickerStyle = css`
  width: 100%;
  margin-bottom: 2%;
`;

function CarYear({
  setRegistrationInfo,
}: Props<React.Dispatch<React.SetStateAction<Partial<RegistrationInfo>>>>) {
  const inputTyping = (e: any) => {
    const inputValue = e.$y;
    setRegistrationInfo((registrationInfo) => {
      return {
        ...registrationInfo,
        carYear: inputValue,
      };
    });
  };

  return (
    <div style={{ width: "30.1vw" }}>
      <span css={titleStyle}>연식</span>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]} sx={{ margin: "1% 0 0 0" }}>
          <DatePicker
            css={pickerStyle}
            label={'"year"'}
            views={["year"]}
            onChange={inputTyping}
          />
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
}

export default CarYear;
