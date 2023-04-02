import { call } from "redux-saga/effects";
import { userSignUpSendApi, companySignUpSendApi } from "./../lib/api";
import { put } from "redux-saga/effects";

// 액션 이름 생성
export const SIGNUP_CHECK = "SIGNUP_CHECK";
export const USER_SIGN_UP_SEND_REQUEST = "USER_SIGN_UP_SEND_REQUEST";
export const USER_SIGN_UP_SEND_SUCCESS = "USER_SIGN_UP_SEND_SUCCESS";
export const COMPANY_SIGN_UP_SEND_REQUEST = "COMPANY_SIGN_UP_SEND_REQUEST";
export const COMPANY_SIGN_UP_SEND_SUCCESS = "COMPANY_SIGN_UP_SEND_SUCCESS";
export const IS_CAN_SIGNUP_ACTION = "IS_CAN_SIGNUP_ACTION";
export const IS_CAN_SIGNUP_RESET = "IS_CAN_SIGNUP_RESET";

// 액션 생성 함수
export const SetIsSignupAction = (isSignUp: Object) => ({
  type: SIGNUP_CHECK,
  payload: isSignUp,
});

export const userSignUpSendAction = (formData: FormData) => ({
  type: USER_SIGN_UP_SEND_REQUEST,
  payload: formData,
});

export const userSignUpSendSuccess = (payload: any) => ({
  type: USER_SIGN_UP_SEND_SUCCESS,
  payload,
});

export const companySignUpSendAction = (formData: FormData) => ({
  type: COMPANY_SIGN_UP_SEND_REQUEST,
  payload: formData,
});

export const companySignUpSendSuccess = (payload: any) => ({
  type: COMPANY_SIGN_UP_SEND_SUCCESS,
  payload,
});

export const IsCanSignUpAction = () => ({
  type: IS_CAN_SIGNUP_ACTION,
});

export const IsCanSignUpReset = () => ({
  type: IS_CAN_SIGNUP_RESET,
});

// 초기값
const initialState = {
  isLoading: false,
  success: false,
};

// 유저 회원가입 요청
export function* userSignUpActionSaga(
  action: ReturnType<typeof userSignUpSendAction>
): Generator<any, void, unknown> {
  console.log(action.payload);
  try {
    const response: any = yield call(userSignUpSendApi, action.payload);

    yield put(userSignUpSendSuccess(response.data));
  } catch (error) {
    console.log(error);
  }
}

// 기업 회원가입 요청
export function* companySignUpActionSaga(
  action: ReturnType<typeof companySignUpSendAction>
): Generator<any, void, unknown> {
  try {
    const response: any = yield call(companySignUpSendApi, action.payload);

    yield put(companySignUpSendSuccess(response.data));
  } catch (error) {
    console.log(error);
  }
}

// 리듀서
export function SignUpReducer(state = initialState, action: any) {
  switch (action.type) {
    case SIGNUP_CHECK:
      return { ...state, success: action.payload };
    case USER_SIGN_UP_SEND_SUCCESS:
      return { ...state, ...action.payload };
    case COMPANY_SIGN_UP_SEND_SUCCESS:
      return { ...state, ...action.payload };
    case IS_CAN_SIGNUP_ACTION:
      return { ...state, isSignPossible: true };
    case IS_CAN_SIGNUP_RESET:
      return { ...state, isSignPossible: false };
    default:
      return state;
  }
}
