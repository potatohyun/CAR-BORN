import { useEffect, useState } from "react";
import { StyleSignUpInputDiv } from "../../../routes/auth/SignupPage";
import { SignupFormData } from "./SignUpButton";
import SignUpUserPhoneNumberModal from "./modal/SignUpUserPhoneNumberModal";
import { StyleNameLabel } from "./SignUpUserName";
import { StyleIdCheckDiv, StyleIdCheckInput } from "./SignUpUserId";
import styled from "@emotion/styled";

export interface SignUpUserPhoneNumberState {
  phoneNumber: string;
  isVerified: boolean;
  error: string;
}

export type SignUpCompanyPhoneNumberProps = {
  signupCompanyFormData: SignupFormData;
  setSignupCompanyFormData: React.Dispatch<
    React.SetStateAction<SignupFormData>
  >;
  setIsValid: any;
  isValid: boolean;
};

export const StyleCompanyPhoneNumber = styled.input`
  width: 30%;
  height: 75%;
  text-align: center;
  margin-bottom: 1rem;
  background-color: #d23131;
  color: white;
  border: 5px solid transparent;
  border-radius: 5px;
  font-weight: 900;
  font-size: 1rem;

  &:active {
    background-color: white;
    color: black;
    border: 5px solid #d23131;
  }

  &:hover {
    opacity: 0.8;
  }
` 

const SignUpCompanyPhoneNumber = ({
  setSignupCompanyFormData,
  signupCompanyFormData,
  setIsValid,
  isValid,
}: SignUpCompanyPhoneNumberProps) => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPhoneNumber(value);
    setSignupCompanyFormData({
      ...signupCompanyFormData,
      phonenumber: value,
    });
  };

  // 모달 관련
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    if (phoneNumber.length <= 10 && phoneNumber.length <= 11) {
      alert("휴대폰 번호는 10자리이상 11자리 이하 여야합니다.");
      setIsModalOpen(false);
    } else {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isValid) {
      setSignupCompanyFormData({
        ...signupCompanyFormData,
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
          tabIndex={8}
          type="text"
          id="phoneNumber"
          value={phoneNumber}
          autoComplete="off"
          onChange={(e) => handleChange(e)}
          maxLength={11}
        />
        <StyleCompanyPhoneNumber tabIndex={9} onClick={openModal} value={`인증하기`}/>
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

export default SignUpCompanyPhoneNumber;
