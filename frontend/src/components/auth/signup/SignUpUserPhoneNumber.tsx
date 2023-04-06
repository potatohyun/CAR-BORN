import { useEffect, useState } from "react";
import { StyleSignUpInputDiv } from "../../../routes/auth/SignupPage";
import { SignupFormData } from "./SignUpButton";
import SignUpUserPhoneNumberModal from "./modal/SignUpUserPhoneNumberModal";
import {
  StyleCheckBtn,
  StyleIdCheckDiv,
  StyleIdCheckInput,
} from "./SignUpUserId";
import { StyleIsValidSpaceBetween, StyleNameLabel } from "./SignUpUserName";
import IsValidComponent from "../../isValid/IsValidComponent";
import { useSelector } from "react-redux";

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
    const regex = /^[0-9]*$/;
    if (regex.test(value)) {
      setPhoneNumber(value);
      if (value.length >= 10 && value.length <= 11){
        setIsAlert(true)
      } else {
        setIsAlert(false)
      }
      setSignupUserFormData({
        ...signupUserFormData,
        phonenumber: value,
      });
    }
  };

  const { msg, isSignPossible} = useSelector((state:any) => state.SignUpReducer)

  // 모달 관련
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    if (phoneNumber.length <= 11 && 10 <= phoneNumber.length) {
      setIsModalOpen(true);
      setSignupUserFormData({
        ...signupUserFormData,
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
      setSignupUserFormData({
        ...signupUserFormData,
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
  }, [isAlert, setMessage, signupUserFormData.phonenumber])

  return (
    <StyleSignUpInputDiv>
      <br />
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
          tabIndex={7}
          type="text"
          id="phoneNumber"
          placeholder="01012345678"
          value={phoneNumber}
          autoComplete="off"
          onChange={(e) => handleChange(e)}
          maxLength={11}
        />
        <StyleCheckBtn
          type="button"
          tabIndex={8}
          onClick={openModal}
          value={`인증하기`}
        />
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
