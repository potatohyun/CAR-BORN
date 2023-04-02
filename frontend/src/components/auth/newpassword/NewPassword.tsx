import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { SearchInputPasswordCheckObj } from "../../../routes/auth/NewPasswordReset";
import { StyledInput, StyleNameLabel } from "../signup/SignUpUserName";
import { StyleHeightDiv } from "../../../routes/auth/SearchID";
import CustomAlert from "../signup/modal/CustomAlert";

// input DIV
const StyleLoginInputDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

type NewPasswordProps = {
  setInputObj: React.Dispatch<
    React.SetStateAction<SearchInputPasswordCheckObj>
  >;
  inputObj: SearchInputPasswordCheckObj;
  newSecondPassword: string;
  setIsNewPassword: React.Dispatch<React.SetStateAction<boolean>>;
  setNewpassword: React.Dispatch<React.SetStateAction<string>>;
  newpassword: string;
};

const NewPassword = ({
  setInputObj,
  inputObj,
  newSecondPassword,
  setIsNewPassword,
  setNewpassword,
  newpassword,
}: NewPasswordProps) => {
  // 메세지
  const [isAlert, setIsAlert] = useState<boolean>(false);
  const [message, setMessage] = useState<String>("");

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 타이핑하는순간 비밀번호중복체크 초기화됨
    e.preventDefault();
    const value = e.currentTarget.value;
    setNewpassword(value);
    const regex =
      /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    if (regex.test(value)) {
      setInputObj({
        ...inputObj,
        newpassword: value,
      });
    } else {
      // setIsAlert(true);
      //   setTimeout(() => {
      //     setIsAlert(false);
      //   }, 2000);
      // setMessage("영소문자나 숫자, 특수문자만 가능합니다.")
      setInputObj({
        ...inputObj,
        newpassword: "",
      });
    }
  };

  // 비밀번호 유효성 : 영문자 소문자랑 숫자랑 특수문자(전부가능)
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
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
        setNewpassword("");
        setInputObj({
          ...inputObj,
          newpassword: "",
        });
      }
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.preventDefault();
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
      setMessage("입력한 비밀번호가 조합된 영소문자 및 숫자, 특수문자가 아닙니다.");
      setNewpassword("");
      setInputObj({
        ...inputObj,
        newpassword: "",
      });
    }
  };

  useEffect(() => {
    if (newSecondPassword === newpassword && newpassword) {
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
  }, [newSecondPassword, newpassword, setIsNewPassword]);

  return (
    <StyleLoginInputDiv>
      <br/>
      <StyleNameLabel htmlFor="newpassword">새로운 비밀번호</StyleNameLabel>
      <StyledInput
        type="password"
        id="newpassword"
        name="newpassword"
        autoComplete="off"
        value={newpassword}
        placeholder="newPassword"
        onChange={(e) => handlePassword(e)}
        onKeyDown={(e) => handleKeyPress(e)}
        onBlur={(e) => handleBlur(e)}
      />
      {isAlert ? (
        <div>
          <CustomAlert message={message} />
        </div>
      ) : null}
    </StyleLoginInputDiv>
  );
};

export default NewPassword;
