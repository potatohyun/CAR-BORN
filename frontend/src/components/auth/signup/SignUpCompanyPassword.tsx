import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { StyleSignUpInputDiv } from "../../../routes/auth/SignupPage";
import { SignupFormData } from "./SignUpButton";
import { StyledInput, StyleNameLabel } from "./SignUpUserName";
import CustomAlert from './modal/CustomAlert';

export interface SignUpPasswordProps {
  signupCompanyFormData: SignupFormData;
  setSignupCompanyFormData: React.Dispatch<
    React.SetStateAction<SignupFormData>
  >;
  secondPassword: string;
  setIsPasswordValid: React.Dispatch<React.SetStateAction<boolean>>;
}

export const StyleHeightSpan = styled.span`
  display: block;
  height: 1rem !important;
`

const SignUpCompanyPassword = ({
  setSignupCompanyFormData,
  signupCompanyFormData,
  secondPassword,
  setIsPasswordValid,
}: SignUpPasswordProps) => {
  // 메세지
  const [isAlert, setIsAlert] = useState<boolean>(false);
  const [message, setMessage] = useState<String>("");

  // 입력되는거 formdata에 넘겨주기
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 타이핑하는순간 비밀번호중복체크 초기화됨
    e.preventDefault();
    setSignupCompanyFormData({
      ...signupCompanyFormData,
      password: e.target.value,
    });
    if (secondPassword === e.target.value) {
      setIsPasswordValid(true);
    }
  };

  // 비밀번호 유효성 : 영문자 소문자랑 숫자랑 특수문자(전부가능)
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const regex =
        /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
      if (regex.test(e.currentTarget.value)) {
        setIsAlert(true);
        setTimeout(() => {
          setIsAlert(false);
        }, 2000);
        setMessage("입력한 비밀번호가 유효합니다.");
      } else {
        setIsAlert(true);
        setTimeout(() => {
          setIsAlert(false);
        }, 2000);
        setMessage(
          "입력한 비밀번호가 조합된 영소문자 및 숫자, 특수문자가 아닙니다."
        );
        setSignupCompanyFormData({
          ...signupCompanyFormData,
          password: "",
        });
      }
    }
  };

  useEffect(() => {
    if (
      secondPassword === signupCompanyFormData.password &&
      signupCompanyFormData.password
    ) {
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
  }, [secondPassword, signupCompanyFormData.password]);

  return (
    <StyleSignUpInputDiv>
      <StyleNameLabel htmlFor="companypassword">비밀번호</StyleNameLabel>
      <StyledInput
        tabIndex={4}
        type="password"
        id="companypassword"
        placeholder="비밀번호를 입력해주세요"
        autoComplete="off"
        required
        value={signupCompanyFormData.password}
        onChange={(e) => handlePassword(e)}
        onKeyDown={(e) => handleKeyPress(e)}
      />
      {isAlert ? (
        <div>
          <CustomAlert message={message} />
        </div>
      ) : null}
    </StyleSignUpInputDiv>
  );
};

export default SignUpCompanyPassword;
