import { SetStateAction, Dispatch, useState, ChangeEvent } from "react";
import swal from "sweetalert";
import { StyleSignUpInputDiv } from "../../../routes/auth/SignupPage";
import CustomAlert from "./modal/CustomAlert";
import { SignupFormData } from "./SignUpButton";
import { StyledInput, StyleNameLabel } from "./SignUpUserName";
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
        swal("유효성 검사", "사업자등록번호가 유효합니다", "success");
        setSignupCompanyFormData({
          ...signupCompanyFormData,
          identifynumber: e.target.value,
        });
      }
    } else {
      if (!showWarning) {
        setIsAlert(false);
        swal("유효성 검사", "숫자만 입력 가능합니다.", "error");
        setShowWarning(true);
        setTimeout(() => setShowWarning(false), 200); // 1초 후에 상태값 초기화
      }
    }
  };

  return (
    <StyleSignUpInputDiv>
      <StyleNameLabel htmlFor="businessNumber">사업자등록번호<IsValidComponent isValid={isAlert}/></StyleNameLabel>
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
