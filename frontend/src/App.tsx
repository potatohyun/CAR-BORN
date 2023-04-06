/** @jsxImportSource @emotion/react */
import { css, Global } from "@emotion/react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { JustRoutes, PrivateRoutes } from "./routes";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { LoginOutReducer } from "./modules/takeLoginLogoutModule";

const globalStyles = css`
  @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');
  body {
    font-family: Pretendard;
    margin: 0;
    padding: 0 0 0 0;
    user-select: none;
  }
  .swal-button--confirm {
    padding: 7px 19px;
    border-radius: 2px;
    background-color: red;
    font-size: 14px;
    border: 1px solid #ff0000;
    text-shadow: 0px -1px 0px rgba(0, 0, 0, 0.3);
  }

  .swal-modal {
    width: 25%;
  }

  .swal-button--cancel {
    padding: 6px 24px;
    border-color: #e8e8e8;
    border-radius: 0;
  }
`;

const queryClient = new QueryClient();

// 라우팅 가드 조건 컴포넌트
export const PrivateRoute = ({
  children: Component,
  isLoggedIn,
  ...rest
}: any) => (
  <Route
    {...rest}
    render={(props: any) =>
      isLoggedIn ? (
        <Component {...props} />
      ) : (
        <Navigate to={{ pathname: "/login" }} />
      )
    }
  />
);

function App() {
  // 토큰 가져오기
  const { success } = useSelector((state: any) => state.LoginOutReducer);
  const ObjString: any = localStorage.getItem("login-token");
  const token = JSON.parse(ObjString);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Global styles={globalStyles}></Global>
        <Router>
          <Routes>
            {/* 로그인 안해도 되는 페이지 및 컴포넌트 */}
            {JustRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
            {/* 로그인 해야만 이용가능한 페이지 */}
            {PrivateRoutes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={
                  token ? (
                    route.element
                  ) : (
                    <Navigate to={{ pathname: "/login" }} />
                  )
                }
              />
            ))}
          </Routes>
        </Router>
      </QueryClientProvider>
    </>
  );
}

export default App;
