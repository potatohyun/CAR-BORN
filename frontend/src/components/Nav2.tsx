/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import carBackground from "../assets/carBackground2.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../modules/takeLoginLogoutModule";
import { StyleLinkText, StyleNavLi } from "./Nav";

const container = css`
  height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: black;
  .section1 {
    width: 100%;
    height: 4vh;
    background-color: black;
    display: flex;
    justify-content: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    .loginInfo {
      display: flex;
      justify-content: end;
      height: 100%;
      width: 80%;
      background-color: black;
      color: white;
      div {
        margin: 0 20px;
      }
    }
  }
  .section2 {
    width: 80%;
    height: 45vh;
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background-color: rgba(0, 0, 0, 0.8);
    background-image: url(${carBackground});

    .menuBar {
      width: 80%;
      height: 13.5vh;
      display: flex;
      color: white;
      .logo {
        flex: 4;
        display: flex;
        align-items: center;
      }
      .menu {
        font-size: 20px;

        font-weight: 550;
        flex: 6;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-evenly;
      }
      .item {
        cursor: pointer;
      }
    }
    .location {
      position: relative;
      align-self: baseline;
      color: white;
      font-size: 40px;
      font-weight: bolder;
      margin-bottom: 10px;
    }
  }
`;

export default function Nav2({ setIsToken, isToken }: any) {
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

  // 제목 얘기하기
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
    <div css={container}>
      <div className="section1">
        <div className="loginInfo">
          {success || localToken ? (
            <div className="logo" onClick={handleLogout}>
              {Obj.userId}님 안녕하세요.
            </div>
          ) : (
            <div className="logo" onClick={(): void => navigate("/login")}>
              로그인이 필요합니다.
            </div>
          )}
          {success || localToken ? (
            <div className="logo" onClick={handleLogout}>
              logout
            </div>
          ) : (
            <div className="logo" onClick={(): void => navigate("/login")}>
              login
            </div>
          )}
        </div>
      </div>
      <div className="section2">
        <div className="menuBar">
          <div className="logo" onClick={(): void => navigate("/")}>
            로고임
          </div>
          <div className="menu">
            <div
              className="item"
              onClick={(): void => navigate("/user/car/list")}
            >
              구매
            </div>
            <div
              className="item"
              onClick={(): void => navigate("/user/car/sale/4")}
            >
              판매
            </div>
            <div
              className="item"
              onClick={(): void => navigate("/user/community")}
            >
              커뮤니티
            </div>
            <div className="item" onClick={(): void => navigate("/user/map")}>
              검수 및 정비 예약
            </div>
            <div className="item" onClick={(): void => navigate("/user/car")}>
              MY CAR
            </div>
            {success || localToken ? (
              <div
                className="item"
                onClick={(): void => navigate(`/${userid}/mypage`)}
              >
                MY PAGE
              </div>
            ) : null}
          </div>
        </div>
        <div className="location">{title}</div>
      </div>
    </div>
  );
}
