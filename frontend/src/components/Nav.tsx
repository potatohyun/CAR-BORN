/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useEffect } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../modules/takeLoginLogoutModule";
import { useNavigate } from "react-router-dom";

const StyleMainNav = styled.div`
  width: 100%;
  height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-bottom: 2px solid #d23131;
`;

const StyleMainLogo = styled.div`
  width: 100%;
  height: 13.5vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
`;

const StyleLogo = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: red;
  padding: 2.5rem;
`;

const StyleNav = styled.div`
  width: 60vw;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const StyleNavUl = styled.ul`
  width: 100vw;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: pink;
`;

export const StyleNavLi = styled.li`
  list-style-type: none;
  width: 5rem;
  height: 7vh;
  background-color: red;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  /* margin-right: 0.25rem; */
`;

const StyleNavTitle = styled.h1`
  /* margin-left: 2.5rem; */
`;

export const StyleLinkText = css`
  text-decoration: none;
  font-size: 1.25rem;
  font-weight: bold;
  color: black;
`;

function Nav({ setIsToken, isToken }: any) {
  const navigate = useNavigate();
  // Nav 타이틀, 로그인 확인 여부
  const [title, setTitle] = useState<string>("Home");
  // location.pathname마다 다른 타이틀 가져가게 하려고
  const location = useLocation();
  // 액션 실행
  const dispatch = useDispatch();
  // 유저아이디랑 토큰 가져오기
  useEffect(() => {
    const ObjString = localStorage.getItem("login-token");
    let Obj = null;
    if (ObjString) {
      Obj = JSON.parse(ObjString);
      if (Date.now() > Obj.expire) {
        localStorage.removeItem("login-token");
        alert("로그아웃 되었습니다. 다시 로그인 해주세요.");
        navigate("/login");
      }
    }
  });

  const ObjString: any = localStorage.getItem("login-token");
  const Obj = JSON.parse(ObjString);
  let userid = Obj?.userId || "";

  const { success } = useSelector((state: any) => state.LoginOutReducer);

  useEffect(() => {
    if (location.pathname === "/") {
      setTitle("Home");
    } else if (location.pathname === "/login") {
      setTitle("User Login");
    } else if (location.pathname === "/myvehicle/registration") {
      setTitle("Car Regitration");
    } else if (location.pathname === `/${userid}/mypage`) {
      setTitle(`${userid}'s Page`);
    } else if (location.pathname === `/${userid}/mypage/mycarinfo`) {
      setTitle(`내 차량 정보`);
    }
  }, [location.pathname, setTitle, userid]);

  // 로그아웃
  const handleLogout = () => {
    dispatch(logoutAction());
  };

  let localToken = Obj?.value || "";
  
  return (
    <StyleMainNav>
      <StyleMainLogo>
        <StyleLogo>로고</StyleLogo>
        <StyleNav>
          <StyleNavUl>
            <Link to="/" css={StyleLinkText}>
              <StyleNavLi>Home</StyleNavLi>
            </Link>
            {success || localToken ? (
              <StyleNavLi css={StyleLinkText} onClick={handleLogout}>
                Logout
              </StyleNavLi>
            ) : (
              <Link to="/login" css={StyleLinkText}>
                <StyleNavLi>Login</StyleNavLi>
              </Link>
            )}
            {success || localToken ? (
              <Link to={`/${userid}/mypage`} css={StyleLinkText}>
                <StyleNavLi>Mypage</StyleNavLi>
              </Link>
            ) : null}
            <Link to="/myvehicle/registration" css={StyleLinkText}>
              <StyleNavLi>regist</StyleNavLi>
            </Link>
          </StyleNavUl>
        </StyleNav>
      </StyleMainLogo>
      <StyleNavTitle>{title}</StyleNavTitle>
    </StyleMainNav>
  );
}

export default Nav;
