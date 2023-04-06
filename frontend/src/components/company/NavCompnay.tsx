/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/Logo.png";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { logoutAction } from "../../modules/takeLoginLogoutModule";

const container = css`
  width: 100%;
  height: 11.5vh;
  background-color: black;
  display: flex;
  flex-direction: column;
  position: relative;

  .loginInfo {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    text-align: end;
    color: white;
    height: 30px;

    div {
      margin: 5px 30px 0 20px;
      font-weight: 500;
      font-size: 1rem;
      transition: all 0.2s;
    }
    div:nth-of-type(2):hover {
      font-size: 1.1rem;
      transition: all 0.2s;
    }
  }

  .menu {
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
    justify-content: space-between;
    div {
      margin-bottom: 10px;
    }
    .logo {
      border: 1px solid white;
      height: 60px;
      width: 60px;
      margin-left: 20px;
    }
    .logo2 {
      color: white;
      font-size: 1.2rem;
      font-weight: bold;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

export default function NavGarage() {
  const [name, setName] = useState<string>("");
  const navigate = useNavigate();
  const ObjString: any = localStorage.getItem("login-token");
  const account = JSON.parse(ObjString)?.accountType;
  const url: any = useLocation().pathname;

  useEffect(() => {
    if (!ObjString) navigate("/");
    setName(JSON.parse(ObjString)?.userId);
    if (
      !(
        (account === 1 && url.split("/")[1] === "garage") ||
        (account === 2 && url.split("/")[1] === "inspector") ||
        (account == 3 && url.split("/")[1] === "insurance")
      )
    ) {
      alert("잘못된 접근입니다");
      handleClick();
    }
  }, [ObjString]);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutAction());
    localStorage.removeItem("login-token");
    navigate("/");
    // (async () => {
    //   await logOut.then((res: any) => {
    //     console.log(res);
    //   });
    // })();
  };

  useEffect(() => {
    if (!ObjString) navigate("/");
    setName(JSON.parse(ObjString)?.userId);
  }, [ObjString]);

  const isLoggedIn = useSelector((state: any) => state.LoginOutReducer.success);

  useEffect(() => {
    if (isLoggedIn === false) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  const handleClick = () => {
    if (account === 1) {
      navigate("/garage");
    } else if (account === 2) {
      navigate("/inspector");
    } else {
      navigate("/insurance");
    }
  };

  return (
    <div css={container}>
      <div className="menu">
        <div
          className="logo2"
          onClick={handleClick}
          css={{ cursor: "pointer" }}
        >
          <img
            src={logo}
            alt="logo"
            width="150px"
            height="auto"
            css={{ margin: "20px 0 0 80px" }}
          />
        </div>
        <div
          className="loginInfo"
          css={{ cursor: "default", marginRight: "20px" }}
        >
          <div>{name}님 환영합니다</div>
          <div css={{ cursor: "pointer" }} onClick={handleLogout}>
            로그아웃
          </div>
        </div>
      </div>
    </div>
  );
}
