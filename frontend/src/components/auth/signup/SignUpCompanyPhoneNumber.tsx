import { useEffect, useState } from "react";
import { StyleSignUpInputBtnDiv } from "../../../routes/auth/SignupPage";
import { SignupFormData } from "./SignUpButton";
import SignUpUserPhoneNumberModal from "./modal/SignUpUserPhoneNumberModal";
import { StyleIsValidSpaceBetween, StyleNameLabel } from "./SignUpUserName";
import { StyleCheckBtn, StyleIdCheckDiv, StyleIdCheckInput } from "./SignUpUserId";
import styled from "@emotion/styled";
import swal from "sweetalert";
import IsValidComponent from './../../isValid/IsValidComponent';
import { useSelector } from "react-redux";

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

export const StyleCompanyPhoneNumberCheckBtn = styled.input`
  width: 30%;
  height: 4.6vh;
  margin-bottom: 1rem;
  background-color: #d23131;
  color: white;
  border: 5px solid transparent;
  border-radius: 5px;
  font-weight: 900;
  font-size: 1rem;
  text-align: center;

  &:active {
    background-color: white;
    color: black;
    border: 5px solid #d23131;
  }

  &:hover {
    opacity: 0.8;
  }
`;

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
  // 메세지
  const [isAlert, setIsAlert] = useState<boolean>(false);
  const [message, setMessage] = useState<String>("");

  const [phoneNumber, setPhoneNumber] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const regex = /^[0-9]*$/;
    if (regex.test(value)) {
      setPhoneNumber(value);
      if (value.length >= 10 && value.length <= 11){
        setIsAlert(true)
      } else {
        setIsAlert(false)
      }
      setSignupCompanyFormData({
        ...signupCompanyFormData,
        phonenumber: value,
      });
    }
  };

  const { msg, isSignPossible } = useSelector((state:any) => state.SignUpReducer)

  // 모달 관련
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    if (phoneNumber.length <= 11 && 10 <= phoneNumber.length) {
      setIsModalOpen(true);
      setSignupCompanyFormData({
        ...signupCompanyFormData,
        isVarify: false,
      });
      setIsAlert(true)
    } else {
      setIsAlert(false)
      setMessage("10 ~ 11자리여야합니다.")
      setIsModalOpen(false);
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

  useEffect(() => {
    if(isAlert === false){
      setMessage("10 ~ 11자리여야합니다.")
    } else {
      setMessage(" ")
    }
  }, [isAlert, setMessage, signupCompanyFormData.phonenumber])

  return (
    <StyleSignUpInputBtnDiv>
      <StyleIsValidSpaceBetween>
        <StyleNameLabel htmlFor="phoneNumber">
          휴대폰 번호
          <IsValidComponent isValid={isSignPossible} />
        </StyleNameLabel>
        {isSignPossible ? null : <span>{msg}</span>}
        {isAlert ? null : <span>{message}</span>}
      </StyleIsValidSpaceBetween>
      <StyleIdCheckDiv>
        <StyleIdCheckInput
          tabIndex={8}
          type="text"
          id="phoneNumber"
          placeholder="01012345678"
          value={phoneNumber}
          autoComplete="off"
          onChange={(e) => handleChange(e)}
          maxLength={11}
        />
        <StyleCompanyPhoneNumberCheckBtn tabIndex={9} onClick={openModal} value={`인증하기`}/>
      </StyleIdCheckDiv>

      {/* 모달 */}
      <SignUpUserPhoneNumberModal
        open={isModalOpen}
        onClose={closeModal}
        phoneNumber={phoneNumber}
        setIsValid={setIsValid}
        isValid={isValid}
      />
    </StyleSignUpInputBtnDiv>
  );
};

export default SignUpCompanyPhoneNumber;
