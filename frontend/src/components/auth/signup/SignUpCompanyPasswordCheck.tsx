import React, { useEffect, useState } from "react";
import { StyleSignUpInputDiv } from "../../../routes/auth/SignupPage";
import { SignupFormData } from "./SignUpButton";
import { StyledInput, StyleIsValidSpaceBetween, StyleNameLabel } from "./SignUpUserName";
import IsValidComponent from './../../isValid/IsValidComponent';

export type SignUpCompanyPasswordCheckProps = {
  signupCompanyFormData: SignupFormData;
  setSignupCompanyFormData: React.Dispatch<
    React.SetStateAction<SignupFormData>
  >;
  secondPassword: string;
  setSecondPassword: React.Dispatch<React.SetStateAction<string>>;
  setIsPasswordValid: React.Dispatch<React.SetStateAction<boolean>>;
  isPasswordValid: boolean;
};

const SignUpCompanyPasswordCheck = ({
  signupCompanyFormData,
  setSignupCompanyFormData,
  secondPassword,
  setSecondPassword,
  isPasswordValid,
  setIsPasswordValid,
}: SignUpCompanyPasswordCheckProps) => {
  // 메세지
  const [isAlert, setIsAlert] = useState<boolean>(false);
  const [message, setMessage] = useState<String>("");

  // 비밀번호 중복 체크 로직
  const handleCompanyPasswordCheck = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    setSecondPassword(e.target.value);
    if(e.target.value === '') {
      setMessage(" ")
      setIsAlert(false);
    }
    if (signupCompanyFormData.password === e.target.value) {
      setIsPasswordValid(true);
      setIsAlert(true);
      setSignupCompanyFormData({
        ...signupCompanyFormData,
        passwordcheck: true,
      });
    } else {
      setIsPasswordValid(false);
      setIsAlert(false);
      setSignupCompanyFormData({
        ...signupCompanyFormData,
        passwordcheck: false,
      });
      setMessage("비밀번호가 일치하지 않습니다.");
    }

    // 비밀번호 입력창과 비밀번호 재확인용 입력창이 비어있지 않아야한다는 유효성 조건
    if (signupCompanyFormData.password && e.target.value) {
      setIsPasswordValid(signupCompanyFormData.password === e.target.value);
    } else {
      setIsPasswordValid(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if(e.currentTarget.value === '') {
        setMessage(" ")
        setIsAlert(false);
      }
      if (signupCompanyFormData.password !== e.currentTarget.value) {
        setIsAlert(false);
        setMessage("비밀번호가 일치하지 않습니다.");
      }
    }
  };

  const handleBlur = (e:any) => {
    e.preventDefault();
    if(e.currentTarget.value === '') {
      setMessage(" ")
      setIsAlert(false);
    }
    if (signupCompanyFormData.password !== e.currentTarget.value) {
      setIsAlert(false);
      setMessage("비밀번호가 일치하지 않습니다.");
    }
  }

  // 다른 회원유형으로 옮길때, 초기화
  useEffect(() => {
    if (isPasswordValid && signupCompanyFormData.passwordcheck === false) {
      setSecondPassword("");
    }
  }, [signupCompanyFormData.passwordcheck, setSecondPassword]);

  return (
    <StyleSignUpInputDiv>
      <StyleIsValidSpaceBetween>
        <StyleNameLabel htmlFor="companypasswordcheck">
          비밀번호 확인
          <IsValidComponent isValid={isPasswordValid} />
        </StyleNameLabel>
        {isAlert ? null : <span>{message}</span>}
      </StyleIsValidSpaceBetween>
      <StyledInput
        tabIndex={5}
        type="password"
        name="companypasswordcheck"
        id="companypasswordcheck"
        placeholder="PasswordCheck"
        autoComplete="off"
        required
        value={secondPassword}
        onChange={(e) => handleCompanyPasswordCheck(e)}
        onKeyDown={(e) => handleKeyPress(e)}
        onBlur={(e) => handleBlur(e)}
      />
    </StyleSignUpInputDiv>
  );
};

export default SignUpCompanyPasswordCheck;
