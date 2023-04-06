import { SetStateAction, Dispatch, useState, ChangeEvent } from "react";
import swal from "sweetalert";
import { StyleSignUpInputDiv } from "../../../routes/auth/SignupPage";
import { SignupFormData } from "./SignUpButton";
import { StyledInput, StyleIsValidSpaceBetween, StyleNameLabel } from "./SignUpUserName";
import IsValidComponent from './../../isValid/IsValidComponent';

type SignUpCompanyBusinessNumberProps = {
  setSignupCompanyFormData: Dispatch<SetStateAction<SignupFormData>>;
  signupCompanyFormData: SignupFormData;
};

const SignUpCompanyBusinessNumber = ({
  setSignupCompanyFormData,
  signupCompanyFormData,
}: SignUpCompanyBusinessNumberProps) => {
  // 메세지
  const [isAlert, setIsAlert] = useState<boolean>(false);
  const [message, setMessage] = useState<String>("");

  const [businessNumber, setBusinessNumber] = useState<string>(
    signupCompanyFormData.identifynumber
  );
  const [showWarning, setShowWarning] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    if (/^[0-9]{0,10}$/.test(value)) {
      setBusinessNumber(value);
      setShowWarning(false);
      if (e.target.value.length === 10) {
        setIsAlert(true);
        setSignupCompanyFormData({
          ...signupCompanyFormData,
          identifynumber: e.target.value,
        });
      } else {
        setIsAlert(false);
        setMessage("사업자등록번호 10자리가 아닙니다.");
      }
    } else {
      setIsAlert(false);
      setMessage("숫자만 입력 가능합니다.");
    }
  };

  return (
    <StyleSignUpInputDiv>
      <StyleIsValidSpaceBetween>
        <StyleNameLabel htmlFor="businessNumber">
          사업자등록번호
          <IsValidComponent isValid={isAlert} />
        </StyleNameLabel>
        {isAlert ? null : <span>{message}</span>}
      </StyleIsValidSpaceBetween>
      <StyledInput
        tabIndex={6}
        type="text"
        id="businessNumber"
        name="businessNumber"
        autoComplete="off"
        placeholder="BusinessNumber"
        maxLength={10}
        value={businessNumber}
        onChange={(e) => handleInputChange(e)}
      />
    </StyleSignUpInputDiv>
  );
};

export default SignUpCompanyBusinessNumber;
