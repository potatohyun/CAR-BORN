import { call, put } from "redux-saga/effects";
import { PhoneNumberCheckApi } from "../lib/api";
import { smsAuthApi } from "./../lib/api";

type State = {
  certifiedNumber: string;
};

// 액션 타입 이름
export const USER_VERIFICATION_CHECK_REQUEST =
  "USER_VERIFICATION_CHECK_REQUEST";
export const USER_VERIFICATION_CHECK_SUCCESS =
  "USER_VERIFICATION_CHECK_SUCCESS";
export const USER_VERIFICATION_CHECK_FAILURE =
  "USER_VERIFICATION_CHECK_FAILURE";
export const USER_SMS_AUTH_ACTION = "USER_SMS_AUTH_ACTION";
export const USER_SMS_AUTH_SUCCESS = "USER_SMS_AUTH_SUCCESS";

export const COMPANY_VERIFICATION_CHECK_REQUEST =
  "COMPANY_VERIFICATION_CHECK_REQUEST";
export const COMPANY_VERIFICATION_CHECK_SUCCESS =
  "COMPANY_VERIFICATION_CHECK_SUCCESS";
export const COMPANY_VERIFICATION_CHECK_FAILURE =
  "COMPANY_VERIFICATION_CHECK_FAILURE";
export const COMPANY_SMS_AUTH_ACTION = "COMPANY_SMS_AUTH_ACTION";
export const COMPANY_SMS_AUTH_SUCCESS = "COMPANY_SMS_AUTH_SUCCESS";

// 액션타입이름(인증번호확인버튼)
export const AUTH_SENDMESSAGE_BTN = "AUTH_SENDMESSAGE_BTN";
export const AUTH_SENDMESSAGE_BTN_RESET = "AUTH_SENDMESSAGE_BTN_RESET";
export const AUTH_CONFIRM_BTN = "AUTH_CONFIRM_BTN";
export const AUTH_CONFIRM_BTN_RESET = "AUTH_CONFIRM_BTN_RESET";

// 액션 생성 함수
export const userverificationNumber = (phoneNumber: string) => ({
  type: USER_VERIFICATION_CHECK_REQUEST,
  payload: phoneNumber,
});

export const userverificationNumberSuccess = (certificatedNumber: string) => ({
  type: USER_VERIFICATION_CHECK_SUCCESS,
  payload: certificatedNumber,
});

export const userverificationNumberFailure = (error: any) => ({
  type: USER_VERIFICATION_CHECK_FAILURE,
  payload: error,
});

export const userSmsAuthAction = (payload: any) => ({
  type: USER_SMS_AUTH_ACTION,
  payload,
});

export const userSmsAuthSuccess = (payload: any) => ({
  type: USER_SMS_AUTH_SUCCESS,
  payload,
});

// 기업 액션 생성 함수

export const companyverificationNumber = (phoneNumber: string) => ({
  type: COMPANY_VERIFICATION_CHECK_REQUEST,
  payload: phoneNumber,
});

export const companyverificationNumberSuccess = (
  certificatedNumber: string
) => ({
  type: COMPANY_VERIFICATION_CHECK_SUCCESS,
  payload: certificatedNumber,
});

export const companyverificationNumberFailure = (error: any) => ({
  type: COMPANY_VERIFICATION_CHECK_FAILURE,
  payload: error,
});

export const companySmsAuthAction = (payload: any) => ({
  type: COMPANY_SMS_AUTH_ACTION,
  payload,
});

export const companySmsAuthSuccess = (payload: any) => ({
  type: COMPANY_SMS_AUTH_SUCCESS,
  payload,
});

// 발송 및 인증번호 버튼 disabled 상태 관리용
export const authSendMessageBtn = () => ({
  type: AUTH_SENDMESSAGE_BTN,
});

export const authSendMessageBtnReset = () => ({
  type: AUTH_SENDMESSAGE_BTN_RESET,
});

export const authConfirmBtn = () => ({
  type: AUTH_CONFIRM_BTN,
});

export const authConfirmBtnReset = () => ({
  type: AUTH_CONFIRM_BTN_RESET,
});

// 초기값
const initialState: State = {
  certifiedNumber: "",
};

// 인증번호 관련 사가
// 유저 휴대전화번호 보내기
export function* userverificationNumberSaga(
  action: ReturnType<typeof userverificationNumber>
): Generator<any, any, any> {
  try {
    const response = yield call(PhoneNumberCheckApi, action.payload);
    console.log("phoneNubmer", response);

    yield put({ type: USER_VERIFICATION_CHECK_SUCCESS, payload: response });
  } catch (error) {
    console.log(error);
  }
}

// 회사 휴대전화번호 보내기
export function* companyverificationNumberSaga(
  action: ReturnType<typeof companyverificationNumber>
): Generator<any, any, any> {
  try {
    const response = yield call(PhoneNumberCheckApi, action.payload);
    console.log("phoneNubmer", response);

    yield put({
      type: COMPANY_VERIFICATION_CHECK_SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.log(error);
  }
}

// 유저 인증번호랑 전화번호 보내기
export function* userSmsAuthSaga(
  action: ReturnType<typeof userSmsAuthAction>
): Generator<any, any, any> {
  try {
    const response = yield call(smsAuthApi, action.payload);
    console.log("userSms", response);
    yield put(userSmsAuthSuccess(response));
  } catch (error) {
    console.log(error);
  }
}

// 기업 인증번호랑 전화번호 보내기
export function* companySmsAuthSaga(
  action: ReturnType<typeof companySmsAuthAction>
): Generator<any, any, any> {
  try {
    const response = yield call(smsAuthApi, action.payload);
    console.log("userSms", response);
    yield put(companySmsAuthSuccess(response));
  } catch (error) {
    console.log(error);
  }
}

//리듀서
export function verificationNumberReducer(
  state = initialState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case USER_VERIFICATION_CHECK_SUCCESS:
      return { ...state, isSend: action.payload };
    case COMPANY_VERIFICATION_CHECK_SUCCESS:
      return { ...state, isSend: action.payload };
    case USER_SMS_AUTH_SUCCESS:
      return { ...state, isPass: action.payload };
    case COMPANY_SMS_AUTH_SUCCESS:
      return { ...state, isPass: action.payload };
    case AUTH_SENDMESSAGE_BTN:
      return { ...state, isSendBtn: true };
    case AUTH_SENDMESSAGE_BTN_RESET:
      return { ...state, isSendBtn: false };
    case AUTH_CONFIRM_BTN:
      return { ...state, isConfirmBtn: true };
    case AUTH_CONFIRM_BTN_RESET:
      return { ...state, isConfirmBtn: false };
    default:
      return state;
  }
}
