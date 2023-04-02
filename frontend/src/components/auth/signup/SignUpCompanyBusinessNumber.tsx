import { SetStateAction, Dispatch, useState, ChangeEvent } from "react";
import { StyleSignUpInputDiv } from "../../../routes/auth/SignupPage";
import CustomAlert from "./modal/CustomAlert";
import { SignupFormData } from "./SignUpButton";
import { StyledInput, StyleNameLabel } from "./SignUpUserName";

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
          setTimeout(() => {
            setIsAlert(false);
          }, 2000);
        setMessage("사업자등록번호가 유효합니다")
        setSignupCompanyFormData({
          ...signupCompanyFormData,
          identifynumber: e.target.value,
        });
      }
    } else {
      if (!showWarning) {
        setIsAlert(true);
        setTimeout(() => {
          setIsAlert(false);
        }, 2000);
        setMessage("숫자만 입력 가능합니다.");
        setShowWarning(true);
        setTimeout(() => setShowWarning(false), 200); // 1초 후에 상태값 초기화
      }
    }
  };

  return (
    <StyleSignUpInputDiv>
      <StyleNameLabel htmlFor="businessNumber">사업자등록번호</StyleNameLabel>
      <br />
      <StyledInput
        tabIndex={6}
        type="text"
        id="businessNumber"
        name="businessNumber"
        autoComplete="off"
        placeholder="숫자만 입력해주세요"
        maxLength={10}
        value={businessNumber}
        onChange={(e) => handleInputChange(e)}
      />
      {isAlert ? (
        <div>
          <CustomAlert message={message} />
        </div>
      ) : null}
    </StyleSignUpInputDiv>
  );
};

export default SignUpCompanyBusinessNumber;
