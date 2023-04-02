import React, { useEffect, useState } from "react";
import { StyleSignUpInputDiv } from "../../../routes/auth/SignupPage";
import CustomAlert from "./modal/CustomAlert";
import { SignupFormData } from "./SignUpButton";
import { StyledInput, StyleNameLabel } from "./SignUpUserName";

export interface SignUpPasswordProps {
  signupUserFormData: SignupFormData;
  setSignupUserFormData: React.Dispatch<React.SetStateAction<SignupFormData>>;
  secondPassword: string;
  setIsPasswordValid: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignUpUserPassword = ({
  setSignupUserFormData,
  signupUserFormData,
  secondPassword,
  setIsPasswordValid,
}: SignUpPasswordProps) => {
  // 메세지
  const [isAlert, setIsAlert] = useState<boolean>(false);
  const [message, setMessage] = useState<String>("");

  // 입력되는거 formdata에 넘겨주기
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    // 타이핑하는순간 비밀번호중복체크 초기화됨
    setSignupUserFormData({
      ...signupUserFormData,
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
      // 영어 소문자, 숫자, 특수문자 모두 조합해야함을 나타내는 정규표현식
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
        setSignupUserFormData({
          ...signupUserFormData,
          password: "",
        });
      }
    }
  };

  useEffect(() => {
    if (
      secondPassword === signupUserFormData.password &&
      signupUserFormData.password
    ) {
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
  }, [secondPassword, signupUserFormData.password]);

  return (
    <StyleSignUpInputDiv>
      <StyleNameLabel htmlFor="userpassword">비밀번호</StyleNameLabel>
      <br />
      <StyledInput
        type="password"
        id="userpassword"
        name="userpassword"
        tabIndex={3}
        placeholder="비밀번호를 입력해주세요"
        autoComplete="off"
        required
        value={signupUserFormData.password}
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

export default SignUpUserPassword;
