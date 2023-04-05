import { useEffect, useState } from "react";
import { StyleSignUpInputDiv } from "../../../routes/auth/SignupPage";
import { SignupFormData } from "./SignUpButton";
import SignUpUserPhoneNumberModal from "./modal/SignUpUserPhoneNumberModal";
import { StyleCheckBtn, StyleIdCheckDiv, StyleIdCheckInput } from "./SignUpUserId";
import { StyleNameLabel } from './SignUpUserName';
import swal from "sweetalert";
import IsValidComponent from "../../isValid/IsValidComponent";

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
    if (phoneNumber.length <= 11 && 10 <= phoneNumber.length) {
      setIsModalOpen(true);
      setSignupUserFormData({
        ...signupUserFormData,
        isVarify: false,
      });
    } else {
      swal("유효성 검사", "휴대폰 번호는 10자리이상 11자리 이하 여야합니다.", "error");
      setIsModalOpen(false);
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
      <StyleIdCheckDiv>
        <StyleIdCheckInput
          tabIndex={7}
          type="text"
          id="phoneNumber"
          placeholder="01012345678"
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
    </StyleSignUpInputDiv>
  );
};

export default SignUpUserPhoneNumber;
