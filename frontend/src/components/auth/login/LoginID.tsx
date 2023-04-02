import React from "react";
import styled from "@emotion/styled";
import { LoginInputProps } from "../../../routes/auth/LoginPage";
import { StyledInput, StyleNameLabel } from "../signup/SignUpUserName";

// CSS
const StyleLoginInputDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

// 로그인 아이디 데이터 받아오는 컴포넌트
const LoginID = ({ setLoginInput, loginInput }: LoginInputProps) => {
  // 값이 변화함에 따라서 바뀜
  const handleChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInput({ ...loginInput, loginid: value });
  };

  return (
    <StyleLoginInputDiv>
      <br/>
      <StyleNameLabel htmlFor="loginid">아이디</StyleNameLabel>
      <StyledInput
        type="text"
        id="loginid"
        name="loginid"
        autoComplete="off"
        placeholder="아이디"
        onChange={handleChange}
      />
    </StyleLoginInputDiv>
  );
};

export default LoginID;
