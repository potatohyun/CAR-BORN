import {
  Props,
  RegistrationInfo,
} from "../../../routes/userUseFnc/MyVehicleRegistration";

function ManufacturingCompany({
  setRegistrationInfo,
}: Props<React.Dispatch<React.SetStateAction<Partial<RegistrationInfo>>>>) {
  const inputTyping = (e: React.ChangeEvent<HTMLInputElement>): void => {
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
      <span>제조사 / 차량모델</span>
      <div>
        <input type="text" autoComplete="false" onChange={inputTyping} />
      </div>
    </div>
  );
}

export default ManufacturingCompany;
