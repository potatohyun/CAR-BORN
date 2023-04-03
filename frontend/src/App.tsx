/** @jsxImportSource @emotion/react */
import { css, Global } from "@emotion/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";

import MyVehicleRegistration from "./routes/userUseFnc/MyVehicleRegistration";
import VehiclePurchase from "./routes/userUseFnc/VehiclePurchase";
import Signup from "./routes/auth/SignupPage";
import UserHome from "./routes/userUseFnc/UserHome";
import GarageHome from "./routes/company/garage/GarageHome";
import InspectorHome from "./routes/company/inspector/InspectorHome";
import InsuranceHome from "./routes/company/insurance/InsuranceHome";
import VehiclePurchaseDetail from "./routes/userUseFnc/VehiclePurchaseDetail";
import BookList from "./routes/company/BookList";
import ViewHistory from "./routes/company/ViewHistory";
import SaleRegistration from "./routes/userUseFnc/SaleRegistration";
import Register from "./routes/company/Register";
import Searchid from "./routes/auth/SearchID";
import SearchidComplete from "./routes/auth/SearchidComplete";
import PasswordResetCheck from "./routes/auth/PasswordResetCheck";
import PasswordComplete from "./routes/auth/PasswordComplete";
import MyPage from "./routes/MyPage";
import MyCarInfo from "./components/MyPage/MyCarInfo";
import MyCarInfoDetail from "./components/MyPage/DetailComponent/MyCarInfoDetail";
import RepairContent from "./components/MyPage/RepairContent";
import BuyContent from "./components/MyPage/BuyContent";
import SellContent from "./components/MyPage/SellContent";
import UserInfoDelete from "./components/MyPage/UserInfoDelete";
import CompanyInfoDelete from "./components/MyPage/CompanyInfoDelete";
import LoginPage from "./routes/auth/LoginPage";
import NaverMap from "./routes/userUseFnc/NaverMap";
import GetAgreementPage from "./routes/auth/GetAgreementPage";
import NewPasswordReset from "./routes/auth/NewPasswordReset";
import MyInspectorDetail from "./components/MyPage/DetailComponent/MyInspectorDetail";
import InspectorContent from "./components/MyPage/InspectorContent";
import MyRepairDetail from "./components/MyPage/DetailComponent/MyRepairDetail";
import InsuranceContent from "./components/MyPage/InsuranceContent";
import MyInsuranceDetail from "./components/MyPage/DetailComponent/MyInsuranceDetail";
import MyCommunityContent from "./components/MyPage/MyCommunityContent";
import UserPasswordModify from "./components/MyPage/UserPasswordModify";
import MyInspectorBookDetail from "./components/MyPage/DetailComponent/MyInspectorBookDetail";
import MyRepairBookDetail from "./components/MyPage/DetailComponent/MyRepairBookDetail";
import Community from "./routes/userUseFnc/Community";

const globalStyles = css`
  body {
    font-family: "Open Sans", sans-serif;
    margin: 0;
    padding: 0 0 0 0;
  }
`;

const queryClient = new QueryClient();

// 경로 지정
const routes = [
  { path: "/", element: <UserHome /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/getagreement", element: <GetAgreementPage /> },
  { path: "/signup", element: <Signup /> },
  { path: "/searchid", element: <Searchid /> },
  { path: "/searchid/searchidcomplete", element: <SearchidComplete /> },
  { path: "/passwordresetcheck", element: <PasswordResetCheck /> },
  { path: "/passwordresetcheck/passwordreset", element: <NewPasswordReset /> },
  {
    path: "/passwordresetcheck/passwordreset/passwordcomplete",
    element: <PasswordComplete />,
  },
  { path: "/:userid/mypage", element: <MyPage /> },
  { path: "/:userid/mypage/mycarinfo", element: <MyCarInfo /> },
  {
    path: "/:userid/mypage/mycarinfo/:carId/detail",
    element: <MyCarInfoDetail />,
  },
  { path: "/:userid/mypage/inspector", element: <InspectorContent /> },
  {
    path: "/:userid/mypage/inspector/:carId/completedetail",
    element: <MyInspectorDetail />,
  },
  {
    path: "/:userid/mypage/inspector/:carId/bookdetail",
    element: <MyInspectorBookDetail />,
  },
  { path: "/:userid/mypage/repair", element: <RepairContent /> },
  {
    path: "/:userid/mypage/repair/:carId/completedetail",
    element: <MyRepairDetail />,
  },
  {
    path: "/:userid/mypage/repair/:carId/bookdetail",
    element: <MyRepairBookDetail />,
  },
  { path: "/:userid/mypage/insurance", element: <InsuranceContent /> },
  {
    path: "/:userid/mypage/insurance/:carId/completedetail",
    element: <MyInsuranceDetail />,
  },
  { path: "/:userid/mypage/community", element: <MyCommunityContent /> },
  { path: "/:userid/mypage/buycontent", element: <BuyContent /> },
  { path: "/:userid/mypage/sellcontent", element: <SellContent /> },
  { path: "/:userid/mypage/insurance", element: <InsuranceContent /> },
  { path: "/:userid/mypage/userinfodelete", element: <UserInfoDelete /> },
  { path: "/:userid/mypage/companyinfodelete", element: <CompanyInfoDelete /> },
  {
    path: "/:userid/mypage/userpasswordmodify",
    element: <UserPasswordModify />,
  },
  {
    path: "/:userid/mypage/companypasswordmodify",
    element: <UserPasswordModify />,
  },
  { path: "/garage", element: <GarageHome /> },
  { path: "/garage/reserve", element: <BookList /> },
  { path: "/garage/history", element: <ViewHistory /> },
  { path: "/garage/register", element: <Register /> },
  { path: "/inspector", element: <InspectorHome /> },
  { path: "/inspector/reserve", element: <BookList /> },
  { path: "/inspector/history", element: <ViewHistory /> },
  { path: "/inspector/register", element: <Register /> },
  { path: "/insurance", element: <InsuranceHome /> },
  { path: "/insurance/history", element: <ViewHistory /> },
  { path: "/insurance/register", element: <Register /> },
  { path: "/user/car", element: <MyVehicleRegistration /> },
  { path: "/user/car/list", element: <VehiclePurchase /> },
  { path: "/user/car/:carId/:id", element: <VehiclePurchaseDetail /> },
  { path: "/user/car/sale/:id", element: <SaleRegistration /> },
  { path: "/user/map", element: <NaverMap /> },
  { path: "/user/community", element: <Community /> },
];

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Global styles={globalStyles}></Global>
        <Router>
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Routes>
        </Router>
      </QueryClientProvider>
    </>
  );
}

export default App;
