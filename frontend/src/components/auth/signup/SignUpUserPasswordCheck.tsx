import { StyleSignUpInputDiv } from "../../../routes/auth/SignupPage";
import React, { useEffect } from "react";
import { SignupFormData } from "./SignUpButton";
import { StyledInput, StyleNameLabel } from "./SignUpUserName";
import styled from "@emotion/styled";
import IsValidComponent from "../../isValid/IsValidComponent";
import swal from "sweetalert";

export type SignUpUserPasswordCheckProps = {
  signupUserFormData: SignupFormData;
  setSignupUserFormData: React.Dispatch<React.SetStateAction<SignupFormData>>;
  secondPassword: string;
  setSecondPassword: React.Dispatch<React.SetStateAction<string>>;
  setIsPasswordValid: React.Dispatch<React.SetStateAction<boolean>>;
  isPasswordValid: boolean;
};

export const StyleSpanImg = styled.span`
  text-align: center;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  display: inline-block;
  background-color: #00ff7b;
  color: white;
`

export const StylePasswordCheck = styled.span`
  display: inline-block;
  text-align: right;
  color: #d23131;
  font-weight: 900;
  font-size: 1rem;
`;

const SignUpUserPasswordCheck = ({
  signupUserFormData,
  setSignupUserFormData,
  secondPassword,
  setSecondPassword,
  setIsPasswordValid,
  isPasswordValid,
}: SignUpUserPasswordCheckProps) => {
  // 비밀번호 중복 체크 로직
  const handleUserPasswordCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSecondPassword(e.target.value);
    if (signupUserFormData.password === e.target.value) {
      setIsPasswordValid(true);
      setSignupUserFormData({
        ...signupUserFormData,
        passwordcheck: true,
      });
    } else {
      setIsPasswordValid(false);
      setSignupUserFormData({
        ...signupUserFormData,
        passwordcheck: false,
      });
    }

    // 비밀번호 입력창과 비밀번호 재확인용 입력창이 비어있지 않아야한다는 유효성 조건
    if (signupUserFormData.password && e.target.value) {
      setIsPasswordValid(signupUserFormData.password === e.target.value);
      swal("유효성 검사", "비밀번호가 일치합니다.", "success");
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
    if (isPasswordValid && signupUserFormData.passwordcheck === false) {
      setSecondPassword("");
    }
  }, [signupUserFormData.passwordcheck, setSecondPassword]);

  return (
    <StyleSignUpInputDiv>
      <StyleNameLabel htmlFor="userpasswordcheck">비밀번호 확인<IsValidComponent isValid={isPasswordValid}/></StyleNameLabel>
      <StyledInput
        type="password"
        name="userpasswordcheck"
        id="userpasswordcheck"
        tabIndex={4}
        placeholder="PasswordCheck"
        autoComplete="off"
        required
        value={secondPassword}
        onChange={(e) => handleUserPasswordCheck(e)}
        onKeyDown={(e) => handleKeyPress(e)}
      />
    </StyleSignUpInputDiv>
  );
};

export default SignUpUserPasswordCheck;
