import React from "react";
import styled from "@emotion/styled";
import { LoginProps } from "../../../routes/Login";

// input DIV
const StyleLoginInputDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const LoginID = ({ setinputObj }: LoginProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setinputObj((prevState) => ({ ...prevState, 'userid': value }));
  };

  return (
    <StyleLoginInputDiv>
      <span>아이디</span>
      <input
        type="text"
        id="userId"
        autoComplete="off"
        placeholder="아이디"
        onChange={handleChange}
      />
    </StyleLoginInputDiv>
  );
};

export default LoginID;
