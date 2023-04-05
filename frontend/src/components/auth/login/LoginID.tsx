import React from "react";
import styled from "@emotion/styled";
import { LoginInputProps } from "../../../routes/auth/LoginPage";
import { StyledInput, StyleNameLabel } from "../signup/SignUpUserName";
import swal from "sweetalert";

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
    const regex = /^[a-z0-9_]+$/;
    if (value === '' || regex.test(value)) {
      setLoginInput({ ...loginInput, loginid: value });
    } else {
      swal("아이디 오류", "영소문자 및 숫자와 _ 만 기입 가능합니다.", "error");
      setLoginInput({ ...loginInput, loginid: "" });
    }
  };

  return (
    <StyleLoginInputDiv>
      <StyleNameLabel htmlFor="loginid">아이디</StyleNameLabel>
      <StyledInput
        type="text"
        id="loginid"
        name="loginid"
        autoComplete="off"
        placeholder="ID"
        minLength={5}
        maxLength={20}
        onChange={handleChange}
        value={loginInput.loginid}
      />
    </StyleLoginInputDiv>
  );
};

export default LoginID;
