import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import PasswordResetVerify from "../../components/auth/passwordreset/PasswordResetVerify";
import PasswordResetID from "../../components/auth/passwordreset/PasswordResetID";
import { passwordResetCheck } from "../../modules/PasswordCheckModule";
import Nav from "./../../components/Nav";
import { StyleHeightDiv, StyleSearchIdDiv } from "./SearchID";
import Nav2 from "../../components/Nav2";

export const StyleLoginSignUpDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyleLoginSignUpBoxDiv = styled.div`
  width: 25%;
  padding: 0rem, 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid transparent;
  background-color: #fdfdfde9;
`;

export const StylePasswordResetCheckTitle = styled.div`
  width: 150%;
  height: 20%;
  border-bottom: 1px solid red;
  text-align: center;
`;

export const StyleLoginSignUpBtn = styled.button`
  width: 15rem;
  text-align: center;
  font-size: 1.2rem;
  color: white;
  background-color: #d23131;
  border: none;
  margin: 0.5rem 0;
`;

export const StyleLoginAnotherLink = styled.div`
  font-size: 0.7rem;
  text-decoration: none;
`;

export const StylePasswordResetCheckBtn = styled.button`
  width: 88%;
  height: 75%;
  margin-top: 1rem;
  margin-bottom: 2rem;
  text-align: center;
  margin-right: 0.2rem;
  background-color: #d23131;
  color: white;
  border: 5px solid transparent;
  border-radius: 5px;
  font-weight: 900;
  font-size: 1rem;

  &:active {
    background-color: white;
    color: black;
    border: 5px solid #d23131;
  }

  &:hover {
    opacity: 0.8;
  }
`

// 타입 설정
export type PasswordResetInputObj = {
  userid: string;
  phonenumber: string;
  isVerify: boolean;
};

const PasswordResetCheck = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isverify = useSelector((state: any) => state.passwordResetCheckReducer.isVerify);
  const [inputObj, setinputObj] = useState<PasswordResetInputObj>({
    userid: "",
    phonenumber: "",
    isVerify: false,
  });

  const handlePasswordReset = () => {
    dispatch(passwordResetCheck(inputObj));
  };

  useEffect(() => {
    if (isverify) {
      navigate("/passwordresetcheck/passwordreset", { state: {
        userid: inputObj.userid,
        phonenumber: inputObj.phonenumber
      }});
    }
  }, [navigate, isverify]);

  return (
    <div>
      <Nav2 />
      <StyleHeightDiv></StyleHeightDiv>
      <StyleSearchIdDiv>
        <StyleLoginSignUpBoxDiv>
          <StylePasswordResetCheckTitle>
            <h2>비밀번호 재설정</h2>
          </StylePasswordResetCheckTitle>
          <PasswordResetID setinputObj={setinputObj} inputObj={inputObj} />
          <PasswordResetVerify setinputObj={setinputObj} inputObj={inputObj} />
          <StylePasswordResetCheckBtn onClick={handlePasswordReset}>
            비밀번호 재설정
          </StylePasswordResetCheckBtn>
        <StyleHeightDiv></StyleHeightDiv>
        <StyleHeightDiv></StyleHeightDiv>
        </StyleLoginSignUpBoxDiv>
      </StyleSearchIdDiv>
    </div>
  );
};

export default PasswordResetCheck;
