import React from "react";
import styled from "@emotion/styled";
import { LoginProps } from "../../../routes/Login";

// input DIV
const StyleLoginInputDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const LoginPassword = ({ setinputObj }: LoginProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setinputObj(prevState => ({ ...prevState, 'userpassword': value }));
  };

  return (
    <StyleLoginInputDiv>
      <span>비밀번호</span>
      <input 
        type="password"
        name="password"
        placeholder="비밀번호"
        onChange={handleChange} 
      />
    </StyleLoginInputDiv>
  );
};

export default LoginPassword;
