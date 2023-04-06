// 로그인 필요 없는 경로 지정
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
import UserPasswordModify from "./components/MyPage/PasswordModify";
import MyInspectorBookDetail from "./components/MyPage/DetailComponent/MyInspectorBookDetail";
import MyRepairBookDetail from "./components/MyPage/DetailComponent/MyRepairBookDetail";
import Community from "./routes/userUseFnc/Community";
import ArticleDetail from "./routes/userUseFnc/ArticleDetail";
import CreateNewWrite from "./components/community/CreateNewWrite";
import NotFound404 from "./components/NotFound404";
import SelfRepairHelper from "./components/SelfRepairHelper";

export const JustRoutes = [
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
  { path: "/garage", element: <GarageHome /> },
  { path: "/inspector", element: <InspectorHome /> },
  { path: "/insurance", element: <InsuranceHome /> },
  { path: "/user/self-repair", element: <SelfRepairHelper /> },
  { path: "/*", element: <NotFound404 /> },
];

// 로그인 필수 경로 지정
export const PrivateRoutes = [
  { path: "/user/mypage", element: <MyPage /> },
  { path: "/user/mypage/mycarinfo", element: <MyCarInfo /> },
  {
    path: "/user/mypage/mycarinfo/:carId/detail",
    element: <MyCarInfoDetail />,
  },
  { path: "/user/mypage/inspector", element: <InspectorContent /> },
  {
    path: "/user/mypage/inspector/:carId/completedetail",
    element: <MyInspectorDetail />,
  },
  {
    path: "/user/mypage/inspector/:carId/bookdetail",
    element: <MyInspectorBookDetail />,
  },
  { path: "/user/mypage/repair", element: <RepairContent /> },
  {
    path: "/user/mypage/repair/:carId/completedetail",
    element: <MyRepairDetail />,
  },
  {
    path: "/user/mypage/repair/:carId/bookdetail",
    element: <MyRepairBookDetail />,
  },
  { path: "/user/mypage/insurance", element: <InsuranceContent /> },
  {
    path: "/user/mypage/insurance/:carId/completedetail",
    element: <MyInsuranceDetail />,
  },
  { path: "/user/mypage/community", element: <MyCommunityContent /> },
  { path: "/user/mypage/buycontent", element: <BuyContent /> },
  { path: "/user/mypage/sellcontent", element: <SellContent /> },
  { path: "/user/mypage/insurance", element: <InsuranceContent /> },
  {
    path: "/user/mypage/userpasswordmodify",
    element: <UserPasswordModify />,
  },
  {
    path: "/user/mypage/companypasswordmodify",
    element: <UserPasswordModify />,
  },
  { path: "/garage/reserve", element: <BookList /> },
  { path: "/garage/history", element: <ViewHistory /> },
  { path: "/garage/register", element: <Register /> },
  { path: "/inspector/reserve", element: <BookList /> },
  { path: "/inspector/history", element: <ViewHistory /> },
  { path: "/inspector/register", element: <Register /> },
  { path: "/insurance/history", element: <ViewHistory /> },
  { path: "/insurance/register", element: <Register /> },
  { path: "/user/car", element: <MyVehicleRegistration /> },
  { path: "/user/car/list", element: <VehiclePurchase /> },
  { path: "/user/car/:carId/:id", element: <VehiclePurchaseDetail /> },
  { path: "/user/car/sale/:id", element: <SaleRegistration /> },
  { path: "/user/map", element: <NaverMap /> },
  { path: "/user/community", element: <Community /> },
  { path: "/user/community/:id", element: <ArticleDetail /> },
  { path: "/user/community/write", element: <CreateNewWrite /> },
];
