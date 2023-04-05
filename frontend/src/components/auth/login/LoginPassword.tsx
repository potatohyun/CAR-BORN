import React from "react";
import styled from "@emotion/styled";
import { LoginInputProps } from "../../../routes/auth/LoginPage";
import { StyledInput, StyleNameLabel } from "../signup/SignUpUserName";

// CSS
const StyleLoginInputDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

// 로그인 비밀번호 데이터 받아오는 컴포넌트
const LoginPassword = ({ setLoginInput, loginInput }: LoginInputProps) => {
  // 값이 변화함에 따라서 바뀜
  const handleChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInput({ ...loginInput, loginpassword: value });
  };

  return (
    <StyleLoginInputDiv>
      <StyleNameLabel htmlFor="loginpassword">비밀번호</StyleNameLabel>
      <StyledInput
        type="password"
        id="loginpassword"
        name="loginpassword"
        autoComplete="off"
        placeholder="Password"
        onChange={handleChange}
        value={loginInput.loginpassword}
      />
    </StyleLoginInputDiv>
  );
};

export default LoginPassword;
