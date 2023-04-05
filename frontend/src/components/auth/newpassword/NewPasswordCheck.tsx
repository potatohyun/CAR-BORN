import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { SearchInputPasswordCheckObj } from "../../../routes/auth/NewPasswordReset";
import { StyledInput, StyleNameLabel } from "../signup/SignUpUserName";
import { StyleNewPasswordResetInputDiv } from "./NewPassword";

// input DIV
const StyleLoginInputDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

type NewPasswordCheckProps = {
  setInputObj: React.Dispatch<
    React.SetStateAction<SearchInputPasswordCheckObj>
  >;
  inputObj: SearchInputPasswordCheckObj;
  setNewSecondPassword: React.Dispatch<React.SetStateAction<string>>;
  newSecondPassword: string;
  setIsNewPassword: React.Dispatch<React.SetStateAction<boolean>>;
  isNewPassword: null | boolean;
  newpassword: string;
};

const NewPasswordCheck = ({
  setInputObj,
  inputObj,
  setNewSecondPassword,
  newSecondPassword,
  setIsNewPassword,
  isNewPassword,
  newpassword,
}: NewPasswordCheckProps) => {
  const handlePasswordCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.currentTarget.value;
    setNewSecondPassword(value);
    if (newpassword === value) {
      setNewSecondPassword(value);
      setIsNewPassword(true);
      setInputObj({
        ...inputObj,
        newpasswordcheck: true,
      });
    } else {
      setIsNewPassword(false);
      setInputObj({
        ...inputObj,
        newpasswordcheck: false,
      });
    }
  };

  useEffect(() => {
    if (newSecondPassword === newpassword && newSecondPassword) {
      setIsNewPassword(true);
    } else {
      setIsNewPassword(false);
    }
  }, [newSecondPassword, newpassword, setIsNewPassword]);

  return (
    <StyleNewPasswordResetInputDiv>
      <StyleNameLabel htmlFor="newpasswordcheck">새로운 비밀번호 체크</StyleNameLabel>
      {isNewPassword ? <span>비밀번호가 일치합니다.</span> : null}
      <StyledInput
        type="password"
        id="newpasswordcheck"
        name="newpasswordcheck"
        autoComplete="off"
        value={newSecondPassword}
        placeholder="again"
        onChange={(e) => handlePasswordCheck(e)}
      />
    </StyleNewPasswordResetInputDiv>
  );
};

export default NewPasswordCheck;
