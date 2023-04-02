import React, { useEffect, useState } from "react";
import { StyleSignUpInputDiv } from "../../../routes/auth/SignupPage";
import { SignupFormData } from "./SignUpButton";
import { StyledInput, StyleNameLabel } from "./SignUpUserName";
import { StylePasswordCheck } from "./SignUpUserPasswordCheck";

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
    if (signupCompanyFormData.password === e.target.value) {
      setIsPasswordValid(true);
      setSignupCompanyFormData({
        ...signupCompanyFormData,
        passwordcheck: true,
      });
    } else {
      setIsPasswordValid(false);
      setSignupCompanyFormData({
        ...signupCompanyFormData,
        passwordcheck: false,
      });
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
    }
  };

  // 다른 회원유형으로 옮길때, 초기화
  useEffect(() => {
    if (isPasswordValid && signupCompanyFormData.passwordcheck === false) {
      setSecondPassword("");
    }
  }, [signupCompanyFormData.passwordcheck, setSecondPassword]);

  return (
    <StyleSignUpInputDiv>
      <StyleNameLabel htmlFor="companypasswordcheck">비밀번호 확인</StyleNameLabel>
      {isPasswordValid ? (
        <StylePasswordCheck>비밀번호가 일치합니다.</StylePasswordCheck>
      ) : null}
      <br />
      <StyledInput
        tabIndex={5}
        type="password"
        name="companypasswordcheck"
        id="companypasswordcheck"
        placeholder="비밀번호를 입력해주세요(ex. ssafy123)"
        autoComplete="off"
        required
        value={secondPassword}
        onChange={(e) => handleCompanyPasswordCheck(e)}
        onKeyDown={(e) => handleKeyPress(e)}
      />
    </StyleSignUpInputDiv>
  );
};

export default SignUpCompanyPasswordCheck;
