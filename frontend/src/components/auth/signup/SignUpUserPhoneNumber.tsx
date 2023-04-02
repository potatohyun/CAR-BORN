import { useEffect, useState } from "react";
import { StyleSignUpInputDiv } from "../../../routes/auth/SignupPage";
import { SignupFormData } from "./SignUpButton";
import SignUpUserPhoneNumberModal from "./modal/SignUpUserPhoneNumberModal";
import { StyleCheckBtn, StyleIdCheckDiv, StyleIdCheckInput } from "./SignUpUserId";
import { StyleNameLabel } from './SignUpUserName';
import CustomAlert from "./modal/CustomAlert";

export interface SignUpUserPhoneNumberState {
  phoneNumber: string;
  isVerified: boolean;
  error: string;
}

export type SignUpUserPhoneNumberProps = {
  signupUserFormData: SignupFormData;
  setSignupUserFormData: React.Dispatch<React.SetStateAction<SignupFormData>>;
  setIsValid: any;
  isValid: boolean;
};

const SignUpUserPhoneNumber = ({
  setSignupUserFormData,
  signupUserFormData,
  setIsValid,
  isValid,
}: SignUpUserPhoneNumberProps) => {
  // 메세지
  const [isAlert, setIsAlert] = useState<boolean>(false);
  const [message, setMessage] = useState<String>("");

  const [phoneNumber, setPhoneNumber] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPhoneNumber(value);
    setSignupUserFormData({
      ...signupUserFormData,
      phonenumber: value,
    });
  };

  // 모달 관련
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    if (phoneNumber.length <= 10 && phoneNumber.length <= 11) {
      setIsAlert(true);
      setTimeout(() => {
        setIsAlert(false);
      }, 2000);
      setMessage("휴대폰 번호는 10자리이상 11자리 이하 여야합니다.");
      setIsModalOpen(false);
      setIsValid(false);
      setSignupUserFormData({
        ...signupUserFormData,
        isVarify: false,
      });
    } else {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isValid) {
      setSignupUserFormData({
        ...signupUserFormData,
        isVarify: true,
      });
    }
  }, [isValid]);

  return (
    <StyleSignUpInputDiv>
      <br />
      <StyleNameLabel htmlFor="phoneNumber">휴대폰 번호</StyleNameLabel>
      <br />
      <StyleIdCheckDiv>
        <StyleIdCheckInput
          tabIndex={7}
          type="text"
          id="phoneNumber"
          value={phoneNumber}
          autoComplete="off"
          onChange={(e) => handleChange(e)}
          maxLength={11}
        />
        <StyleCheckBtn type="button" tabIndex={8} onClick={openModal} value={`인증하기`}/>
      </StyleIdCheckDiv>

      {/* 모달 */}
      <SignUpUserPhoneNumberModal
        open={isModalOpen}
        onClose={closeModal}
        phoneNumber={phoneNumber}
        setIsValid={setIsValid}
        isValid={isValid}
      />
      {isAlert ? (
        <div>
          <CustomAlert message={message} />
        </div>
      ) : null}
    </StyleSignUpInputDiv>
  );
};

export default SignUpUserPhoneNumber;
