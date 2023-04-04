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

const StylePasswordInput = styled.input`
  padding: 0.7rem;
  font-size: 1.2rem;
  border: 1px solid #d23131;
  border-radius: 5px;
  width: 93%;
  color: #333;
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;

  &:focus {
    outline: none;
    border-color: #d23131;
    box-shadow: 0px 0px 5px 0px rgba(210, 49, 49, 0.75);
  }
`

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
        <StylePasswordInput
          type="text"
          id="PasswordResetId"
          name="PasswordResetId"
          autoComplete="off"
          placeholder="ID"
          onChange={(e) => handleChange(e)}
        />
      </StylePasswordResetDiv>
    </StyleLoginInputDiv>
  );
};

export default PasswordResetID;
