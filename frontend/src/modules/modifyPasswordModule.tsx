import { userModifyPasswordApi } from "../lib/api";
import { call } from "redux-saga/effects";
import { put } from "redux-saga/effects";
import { companyModifyPasswordApi } from "./../lib/api";

// 액션 타입 정의
export const USER_MODIFY_PASSWORD_REQUEST = "USER_MODIFY_PASSWORD_REQUEST";
export const USER_MODIFY_PASSWORD_SUCCESS = "USER_MODIFY_PASSWORD_SUCCESS";
export const USER_MODIFY_PASSWORD_RESET = "USER_MODIFY_PASSWORD_RESET";
export const COMPANY_MODIFY_PASSWORD_REQUEST =
  "COMPANY_MODIFY_PASSWORD_REQUEST";
export const COMPANY_MODIFY_PASSWORD_SUCCESS =
  "COMPANY_MODIFY_PASSWORD_SUCCESS";
export const COMPANY_MODIFY_PASSWORD_RESET = "COMPANY_MODIFY_PASSWORD_RESET";

// 액션 생성 함수
export const userModifyPasswordRequest = ({
  oldPassword,
  newPassword,
}: any) => ({
  type: USER_MODIFY_PASSWORD_REQUEST,
  payload: { oldPassword, newPassword },
});

export const userModifyPasswordSuccess = (payload: any) => ({
  type: USER_MODIFY_PASSWORD_SUCCESS,
  payload,
});

export const userModifyPasswordReset = () => ({
  type: USER_MODIFY_PASSWORD_RESET,
});

export const companyModifyPasswordRequest = ({
  oldPassword,
  newPassword,
}: any) => ({
  type: COMPANY_MODIFY_PASSWORD_REQUEST,
  payload: { oldPassword, newPassword },
});

export const companyModifyPasswordSuccess = (payload: any) => ({
  type: COMPANY_MODIFY_PASSWORD_SUCCESS,
  payload,
});

export const companyModifyPasswordReset = () => ({
  type: COMPANY_MODIFY_PASSWORD_RESET,
});

// 사가 함수
export function* userModifyPasswordSaga(action: any): Generator<any, any, any> {
  try {
    const response = yield call(userModifyPasswordApi, action.payload);
    localStorage.removeItem("login-token");
    yield put(userModifyPasswordSuccess(response));
  } catch (error) {
    console.log(error);
  }
}

export function* companyModifyPasswordSaga(
  action: any
): Generator<any, any, any> {
  try {
    const response = yield call(companyModifyPasswordApi, action.payload);
    localStorage.removeItem("login-token");
    yield put(companyModifyPasswordSuccess(response));
  } catch (error) {
    console.log(error);
  }
}

const initialState = {
  success: false,
  isLoading: false,
  error: null,
};

// 리듀서 생성
export function userModifyPasswordReducer(
  state = initialState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case USER_MODIFY_PASSWORD_SUCCESS:
      return { ...state, ...action.payload, success: true };
    case USER_MODIFY_PASSWORD_RESET:
      return { ...state, ...action.payload, success: false };
    case COMPANY_MODIFY_PASSWORD_SUCCESS:
      return { ...state, ...action.payload, success: true };
    case COMPANY_MODIFY_PASSWORD_RESET:
      return { ...state, ...action.payload, success: false };
    default:
      return state;
  }
}
