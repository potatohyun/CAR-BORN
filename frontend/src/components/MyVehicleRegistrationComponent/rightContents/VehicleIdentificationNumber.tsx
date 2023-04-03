import {
  Props,
  RegistrationInfo,
} from "../../../routes/userUseFnc/MyVehicleRegistration";

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
      <span>차대번호</span>
      <div>
        <input type="text" autoComplete="false" onBlur={inputTyping} />
      </div>
    </div>
  );
}

export default VehicleIdentificationNumber;
