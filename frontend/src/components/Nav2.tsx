/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import carBackground from "../assets/carBackground2.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginFailureReset,
  logoutAction,
} from "../modules/takeLoginLogoutModule";
import Logo from "../assets/Logo.png";

const container = css`
  width: 100%;
  height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: black;
  position: relative;

  .logoImg {
    cursor: pointer;
  }
  .section1 {
    width: 100%;
    height: 4vh;
    background-color: black;
    display: flex;
    justify-content: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    .loginInfo {
      align-items: center;
      display: flex;
      justify-content: end;
      height: 100%;
      width: 80%;
      background-color: black;
      color: white;
      div {
        margin: 0 20px;
      }
      font-size: 16px;
    }
  }

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
      &:hover {
        font-size: 22px;
        transition: all 0.2s;
      }
      transition: all 0.2s;
    }
  }
  .location {
    position: relative;
    color: white;
    font-size: 40px;
    font-weight: bolder;
    margin-bottom: 10px;
    width: 80%;
    margin-bottom: 20px;
  }
`;

export default function Nav2(msg: any) {
  const navigate = useNavigate();
  // Nav 타이틀, 로그인 확인 여부
  const [title, setTitle] = useState<string>("Home");
  // location.pathname마다 다른 타이틀 가져가게 하려고
  const location = useLocation();
  // 액션 실행
  const dispatch = useDispatch();
  // 유저아이디랑 토큰 가져오기
  const isHome = location.pathname == "/";
  const section2 = css`
    width: ${isHome ? "100%" : "80%"};
    height: 45vh;
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background-color: rgba(0, 0, 0, 0.8);
    background-image: ${!isHome ? `url(${carBackground})` : ""};
    position: relative;
  `;

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

  // 제목 얘기하기
  useEffect(() => {
    // 마이페이지 나의 차량정보 상세 페이지로 갈때,
    const carId = localStorage.getItem("carId");
    const resultId = localStorage.getItem("resultId");
    const bookId = localStorage.getItem("bookId");
    if (location.pathname === "/") {
      setTitle("Car-Born Home");
    } else if (location.pathname === "/login") {
      setTitle("Login");
    } else if (location.pathname === "/myvehicle/registration") {
      setTitle("Car Registration");
    } else if (location.pathname === `/user/mypage`) {
      setTitle(`MyPage`);
    } else if (location.pathname === `/user/mypage/mycarinfo`) {
      setTitle(`MyCarInfo`);
    } else if (location.pathname === `/user/mypage/mycarinfo/${carId}/detail`) {
      setTitle(`MyCarInfo`);
    } else if (location.pathname === `/user/mypage/repair`) {
      setTitle(`MyRepairHistory`);
    } else if (
      location.pathname === `/user/mypage/repair/${resultId}/completedetail`
    ) {
      setTitle(`MyRepairDetail`);
    } else if (
      location.pathname === `/user/mypage/repair/${bookId}/bookdetail`
    ) {
      setTitle(`MyRepairReserve`);
    } else if (location.pathname === `/user/mypage/buycontent`) {
      setTitle(`MyPurchaseHistory`);
    } else if (location.pathname === `/user/mypage/sellcontent`) {
      setTitle(`MySalesHistory`);
    } else if (location.pathname === `/user/mypage/inspector`) {
      setTitle(`MyInspectorHistory`);
    } else if (
      location.pathname === `/user/mypage/inspector/${resultId}/completedetail`
    ) {
      setTitle(`MyInspectorDetail`);
    } else if (
      location.pathname === `/user/mypage/inspector/${bookId}/bookdetail`
    ) {
      setTitle(`MyInspectorReserve`);
    } else if (location.pathname === `/user/mypage/insurance`) {
      setTitle(`MyInsuranceHistory`);
    } else if (location.pathname === `/getagreement`) {
      setTitle(`TermsofUse`);
    } else if (location.pathname === `/signup`) {
      setTitle(`SignUp`);
    } else if (location.pathname === `/searchid`) {
      setTitle(`SearchID`);
    } else if (location.pathname === `/searchid/searchidcomplete`) {
      setTitle(`SearchID Complete`);
    } else if (location.pathname === `/passwordresetcheck`) {
      setTitle(`SearchPassword`);
    } else if (location.pathname === `/passwordresetcheck/passwordreset`) {
      setTitle(`ResetPassword`);
    } else if (
      location.pathname === `/passwordresetcheck/passwordreset/passwordcomplete`
    ) {
      setTitle(`Reset Complete`);
    } else if (
      location.pathname === `/user/mypage/insurance/${resultId}/completedetail`
    ) {
      setTitle(`MyInsuranceDetail`);
    } else if (location.pathname === `/user/mypage/community`) {
      setTitle(`MyPostsHistory`);
    } else if (location.pathname === `/user/mypage/userpasswordmodify`) {
      setTitle("ResetPassword");
    }
  }, [location.pathname, setTitle, title]);

  // 로그아웃
  const handleLogout = () => {
    dispatch(logoutAction());
  };

  const isLoggedIn = useSelector((state: any) => state.LoginOutReducer.success);
  useEffect(() => {
    if (isLoggedIn === false) {
      dispatch(loginFailureReset());
      console.log(1);
      navigate("/login");
    }
  }, [isLoggedIn]);

  // 다른 nav로
  const ObjString: any = localStorage.getItem("login-token");
  const Obj = ObjString ? JSON.parse(ObjString) : null;
  const { success } = useSelector((state: any) => state.LoginOutReducer);
  const localToken = Obj?.value;

  return (
    <div css={container}>
      <div className="section1">
        <div className="loginInfo">
          {localToken ? (
            <div
              className="logo"
              onClick={handleLogout}
              css={{ cursor: "pointer" }}
            >
              LOGOUT
            </div>
          ) : (
            <div
              className="logo"
              onClick={(): void => navigate("/login")}
              css={{ cursor: "pointer" }}
            >
              LOGIN
            </div>
          )}
        </div>
      </div>
      <div css={section2} className="navSection2">
        <div className="menuBar">
          <div className="logo" onClick={(): void => navigate("/")}>
            <img
              src={Logo}
              alt="logo"
              width="200px"
              height="auto"
              className="logoImg"
            />
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
              예약
            </div>
            <div className="item" onClick={(): void => navigate("/user/car")}>
              MY CAR
            </div>
            {success || localToken ? (
              <div
                className="item"
                onClick={(): void => navigate(`/user/mypage`)}
              >
                MY PAGE
              </div>
            ) : null}
          </div>
        </div>
        <div className="location" css={{ cursor: "default" }}>
          {title}
        </div>
      </div>
    </div>
  );
}
