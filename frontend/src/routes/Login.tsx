import styled from "@emotion/styled";
import { Link, useNavigate } from "react-router-dom";
import LoginID from "../components/auth/login/LoginID";
import LoginPassword from "../components/auth/login/LoginPassword";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginTry, User } from "../modules/loginModule";
import { useSelector } from "react-redux";

const StyleLoginDiv = styled.div`
  width: 100vw;
  height: 65vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyleLoginBoxDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid transparent;
  background-color: #d5cfcf2a;
`;

const StyleLogin = styled.div`
  width: 100%;
  height: 20%;
  border-bottom: 1px solid red;
  text-align: center;
`;

const StyleLoginBtn = styled.button`
  width: 15rem;
  text-align: center;
  font-size: 1.2rem;
  color: white;
  background-color: #d23131;
  border: none;
  margin: 0.5rem 0;
`;

const StyleLoginAnotherLink = styled.div`
  font-size: 0.7rem;
  text-decoration: none;
`;

// 타입 설정
export type InputObj = {
  userid: string;
  userpassword: string;
  success?: boolean;
};

export type LoginProps = {
  setinputObj: React.Dispatch<React.SetStateAction<InputObj>>;
};

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const Obj = useSelector((state: any) => state)
  const { success } = Obj.login.users

  const [inputObj, setinputObj] = useState<InputObj>({
    userid: "",
    userpassword: "",
    success: false
  });

  const handleLogin = () => {
    const user: User = {
      userid: inputObj.userid,
      userpassword: inputObj.userpassword,
      status: 404,
      success: false
    };
    dispatch(loginTry(user));
  };

  useEffect(() => {
    if (success) {
      navigate('/')
    }
  }, [success, navigate])

  return (
    <StyleLoginDiv>
      <StyleLoginBoxDiv>
        <StyleLogin>
          <h2>로그인</h2>
        </StyleLogin>
        <LoginID setinputObj={setinputObj} />
        <LoginPassword setinputObj={setinputObj} />
        <StyleLoginBtn onClick={handleLogin}>로그인 하기</StyleLoginBtn>
        <StyleLoginAnotherLink>
          <Link to="/signup">회원가입</Link> /
          <Link to="/searchid"> 아이디 찾기</Link> /
          <Link to="/passwordreset"> 비밀번호 재설정</Link>
        </StyleLoginAnotherLink>
      </StyleLoginBoxDiv>
    </StyleLoginDiv>
  );
};

export default Login;
