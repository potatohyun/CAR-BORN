import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { StyleSignUpInputDiv } from "../../../routes/auth/SignupPage";
import { SignupFormData } from "./SignUpButton";
import {
  StyledInput,
  StyleIsValidSpaceBetween,
  StyleNameLabel,
} from "./SignUpUserName";
import swal from "sweetalert";
import IsValidComponent from "../../isValid/IsValidComponent";

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
`;

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
    const regex =
      /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    const { value } = e.target;
    if (e.target.value === "") {
      setMessage(" ");
      setIsAlert(false);
    }
    if (regex.test(value)) {
      setSignupCompanyFormData({
        ...signupCompanyFormData,
        password: value,
      });
      setIsAlert(true);
    } else {
      setIsAlert(false);
      setMessage("8자리 이상의 영소문자,숫자,특수문자 조합이어야 합니다.");
      setSignupCompanyFormData({
        ...signupCompanyFormData,
        password: e.target.value,
      });
    }
    // 타이핑하는순간 비밀번호중복체크 초기화됨
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
      if (e.currentTarget.value === "") {
        setMessage(" ");
        setIsAlert(false);
      }
      // 영어 소문자, 숫자, 특수문자 모두 조합해야함을 나타내는 정규표현식
      const regex =
        /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
      if (regex.test(e.currentTarget.value)) {
        setIsAlert(true);
      } else {
        if (e.currentTarget.value === "") {
          setMessage(" ");
          setIsAlert(false);
        } else {
          setIsAlert(false);
          setMessage("8자리 이상의 영소문자,숫자,특수문자 조합이어야 합니다.");
          setSignupCompanyFormData({
            ...signupCompanyFormData,
            password: "",
          });
        }
      }
    }
  };

  const handleBlur = (e: any) => {
    const regex =
      /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    if (regex.test(e.currentTarget.value)) {
      setIsAlert(true);
    } else {
      if (e.currentTarget.value === "") {
        setMessage(" ");
        setIsAlert(false);
      } else {
        setIsAlert(false);
        setMessage("8자리 이상의 영소문자,숫자,특수문자 조합이어야 합니다.");
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
      <StyleIsValidSpaceBetween>
        <StyleNameLabel htmlFor="companypassword">
          비밀번호
          <IsValidComponent isValid={isAlert} />
        </StyleNameLabel>
        {isAlert ? null : <span>{message}</span>}
      </StyleIsValidSpaceBetween>
      <StyledInput
        tabIndex={4}
        type="password"
        id="companypassword"
        placeholder="Password"
        autoComplete="off"
        required
        value={signupCompanyFormData.password}
        onChange={(e) => handlePassword(e)}
        onKeyDown={(e) => handleKeyPress(e)}
        onBlur={(e) => handleBlur(e)}
      />
    </StyleSignUpInputDiv>
  );
};

export default SignUpCompanyPassword;
