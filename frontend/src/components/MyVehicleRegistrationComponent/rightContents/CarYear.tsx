import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Props } from "../../../routes/userUseFnc/MyVehicleRegistration";
import { RegistrationInfo } from "./../../../routes/userUseFnc/MyVehicleRegistration";

const now = new Date();
let year = now.getFullYear();

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
    <div>
      <span>연식</span>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]} sx={{ m: 2 }}>
          <DatePicker
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
