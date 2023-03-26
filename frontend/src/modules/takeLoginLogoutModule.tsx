import { call, put } from "redux-saga/effects";
import { loginInputType } from "../routes/auth/LoginPage";
import { LoginApi, LogoutApi } from "../lib/api";

// 액션 타입 이름
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

// 액션 타입 생성 함수
export const loginAction = (payload: loginInputType) => ({
  type: LOGIN_REQUEST,
  payload,
});

export const loginSuccessAction = (payload: any) => ({
  type: LOGIN_SUCCESS,
  payload,
});

export const loginFailureAction = (error: string) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const logoutAction = () => ({ type: LOGOUT_REQUEST });
export const logoutSuccessAction = () => ({ type: LOGOUT_SUCCESS });
export const logoutFailureAction = (error: string) => ({
  type: LOGOUT_FAILURE,
  payload: error,
});

// 로그인 사가
export function* takeLoginSaga(
  action: ReturnType<typeof loginAction>
): Generator<any, void, unknown> {
  try {
    const response: any = yield call(
      LoginApi,
      action.payload as loginInputType
      );

    const accountType = {
      USER: "0",
      REPAIR: "1",
      INSPECTOR: "2",
      INSURANCE: "3",
    };

    const Obj = {
      value: response.captcha,
      expire: Date.now() * 180000,
      userId: response.loginid,
      accountType: accountType.USER,
    }

    const ObjString = JSON.stringify(Obj);
    localStorage.setItem("login-token", ObjString);

    // 밑에는 일부
    // const Token = response.captcha;
    // const userid = response.loginid;

    // localStorage.setItem("accessToken", Token);
    // localStorage.setItem("userid", userid);
    // localStorage.setItem("accountType", String(accountType.USER));

    yield put(loginSuccessAction(response));
  } catch (error: any) {
    yield put(loginFailureAction(error.message));
  }
}

// 로그아웃 사가
export function* takeLogoutSaga() {
  try {
    // 서버 API 호출 등 로그아웃 처리
    yield call(LogoutApi);

    // 로그아웃 성공시, 리덕스 스토어의 데이터 초기화
    yield put(logoutSuccessAction());

    // 세션스토리지에 있는 정보 삭제
    localStorage.removeItem("login-token");
  } catch (error: any) {
    yield put(logoutFailureAction(error));
  }
}

const initialState = {
  loading: false,
  error: null,
  user: null,
  accountType: null,
};

// 로그인, 로그아웃 리듀서
export function LoginOutReducer(state = initialState, action: any) {
  const ObjString: any = localStorage.getItem("login-token");
  let accountType = null;
  if (ObjString) {
    const Obj = JSON.parse(ObjString);
    accountType = Obj.accountType;
  }
  // const accountType = localStorage.getItem("accountType");

  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        accountType: accountType,
        success: true,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
        success: false,
      };
    default:
      return state;
  }
}