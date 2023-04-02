import React from "react";
import styled from "@emotion/styled";
import { PasswordResetInputObj } from "../../../routes/auth/PasswordResetCheck";
import { StyledInput, StyleNameLabel } from "../signup/SignUpUserName";

// input DIV
const StyleLoginInputDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StylePasswordResetDiv = styled.div`
  width: 110%;
`;

type PasswordResetIDProps = {
  setinputObj: React.Dispatch<React.SetStateAction<PasswordResetInputObj>>;
  inputObj: PasswordResetInputObj;
};

const PasswordResetID = ({ setinputObj, inputObj }: PasswordResetIDProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setinputObj({
      ...inputObj,
      userid: value,
    });
  };

  return (
    <StyleLoginInputDiv>
      <br />
      <StylePasswordResetDiv>
        <StyleNameLabel htmlFor="PasswordResetId">아이디</StyleNameLabel>
        <StyledInput
          type="text"
          id="PasswordResetId"
          name="PasswordResetId"
          autoComplete="off"
          placeholder="아이디를 작성해주세요."
          onChange={(e) => handleChange(e)}
        />
      </StylePasswordResetDiv>
    </StyleLoginInputDiv>
  );
};

export default PasswordResetID;
