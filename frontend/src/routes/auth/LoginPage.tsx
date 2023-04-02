import styled from "@emotion/styled";
import { Link, useNavigate } from "react-router-dom";
import LoginID from "../../components/auth/login/LoginID";
import LoginPassword from "../../components/auth/login/LoginPassword";
import React, { useState, useEffect, ButtonHTMLAttributes } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../modules/takeLoginLogoutModule";
import { userInfoDeleteReset } from "../../modules/userInfoDeleteModule";
import { companyInfoDeleteReset } from "../../modules/companyInfoDeleteModule";
import {
  companyModifyPasswordReset,
  userModifyPasswordReset,
} from "../../modules/modifyPasswordModule";
import { IsCanSignUpReset } from "../../modules/signUpModule";
import CustomAlert from "../../components/auth/signup/modal/CustomAlert";
import Nav2 from "./../../components/Nav2";

export const StyleLink = styled(Link)`
  color: #d23131;
  font-size: 0.75rem;
  font-weight: 900;
  text-decoration: none;
  margin: 0 0.5rem;

  &:hover {
    text-decoration: underline;
  }
`;

export const StyleLoginSignUpDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 1rem;
`;

export const StyleLoginSignUpBoxDiv = styled.div`
  width: 35%;
  margin: 5rem 0;
  padding: 0rem, 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid transparent;
  background-color: #fdfdfde9;
`;

export const StyleLoginSignUpTitle = styled.div`
  width: 100%;
  height: 20%;
  border-bottom: 1px solid red;
  text-align: center;

  p {
    font-size: 1.5rem;
    font-weight: 900;
  }
`;

export const StyleLoginSignUpBtn = styled.button<StyleLoginSignUpBtnProps>`
  width: 50%;
  height: 2.5rem;
  margin-left: 1%;
  margin-bottom: 1rem;
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

  background-color: ${(props) => props.backgroundColor};
  border: none;
  cursor: pointer;
`;

export const StyleLoginAnotherLink = styled.div`
  text-decoration: none;
`;

// 로그인 인풋 데이터 타입
export interface loginInputType {
  loginid: string;
  loginpassword: string;
  captcha?: string;
  success?: boolean;
}

// CSS 타입
export interface StyleLoginSignUpBtnProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  backgroundColor: string;
}

// 로그인 props를 정의하는 인터페이스 타입
export interface LoginInputProps {
  setLoginInput: React.Dispatch<React.SetStateAction<loginInputType>>;
  loginInput: loginInputType;
}

const LoginPages = () => {
  // 상수화
  const USER = 0;
  const REPAIR = 1;
  const INSPECTOR = 2;
  const INSURANCE = 3;
  // 액션 실행
  const dispatch = useDispatch();
  // 페이지 이동
  const navigate = useNavigate();
  // 리듀서 가져오기
  const { accountType } = useSelector((state: any) => state.LoginOutReducer);
  const { success } = useSelector((state: any) => state.LoginOutReducer);
  // 메세지
  const [isAlert, setIsAlert] = useState<boolean>(false);
  const [message, setMessage] = useState<String>("");

  // 로그인 데이터 컨테이너
  const initialState = {
    loginid: "",
    loginpassword: "",
  };

  // 로그인 인풋, 리캡챠 적용여부 useState
  const [loginInput, setLoginInput] = useState<loginInputType>(initialState);
  const [captchaValue, setCaptchaValue] = useState<boolean>(false);
  const [isAccountType, setIsAccountType] = useState<number>(0);
  const [isToken, setIsToken] = useState<boolean>(false);

  // 로그인 하기(최종)
  const handleLogin = () => {
    try {
      dispatch(loginAction(loginInput));
    } catch (error: any) {
      setIsAlert(true);
      setTimeout(() => {
        setIsAlert(false);
      }, 2000);
      setMessage(error);
    }
  };

  useEffect(() => {
    setIsAccountType(accountType);
    if (loginInput.loginid && loginInput.loginpassword) {
      setCaptchaValue(true);
    } else {
      setCaptchaValue(false);
    }
  }, [accountType, loginInput.loginid, loginInput.loginpassword]);

  useEffect(() => {
    if (!success) {
      navigate("/login");
      return;
    } else {
      setIsAlert(true);
      setTimeout(() => {
        setIsAlert(false);
      }, 2000);
      setMessage("아이디나 비밀번호가 맞지 않습니다.");
    }

    switch (isAccountType) {
      case USER:
        navigate("/");
        break;
      case REPAIR:
        navigate("/garage");
        break;
      case INSPECTOR:
        navigate("/inspector");
        break;
      case INSURANCE:
        navigate("/insurance");
        break;
      default:
        navigate("/login");
        break;
    }
  }, [success, isAccountType, navigate]);

  useEffect(() => {
    dispatch(userInfoDeleteReset());
    dispatch(companyInfoDeleteReset());
    dispatch(userModifyPasswordReset());
    dispatch(companyModifyPasswordReset());
    dispatch(IsCanSignUpReset());
  }, [dispatch]);

  return (
    <div>
      <Nav2 isToken={isToken} setIsToken={setIsToken} />
      <StyleLoginSignUpDiv>
        <StyleLoginSignUpBoxDiv>
          <StyleLoginSignUpTitle>
            <h2>로그인</h2>
          </StyleLoginSignUpTitle>
          <form onSubmit={handleLogin}>
            <LoginID setLoginInput={setLoginInput} loginInput={loginInput} />
            <LoginPassword
              setLoginInput={setLoginInput}
              loginInput={loginInput}
            />
            <StyleLoginSignUpBtn
              backgroundColor={captchaValue ? "#d23131" : "grey"}
              disabled={!captchaValue}
              type="submit"
            >
              로그인 하기
            </StyleLoginSignUpBtn>
          </form>
          <StyleLoginAnotherLink>
            <StyleLink to="/getagreement">회원가입</StyleLink> /
            <StyleLink to="/searchid"> 아이디 찾기</StyleLink> /
            <StyleLink to="/passwordresetcheck"> 비밀번호 재설정</StyleLink>
          </StyleLoginAnotherLink>
        </StyleLoginSignUpBoxDiv>
        {isAlert ? (
          <div>
            <CustomAlert message={message} />
          </div>
        ) : null}
      </StyleLoginSignUpDiv>
    </div>
  );
};

export default LoginPages;
