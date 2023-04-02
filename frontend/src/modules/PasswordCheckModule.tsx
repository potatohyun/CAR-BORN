import { call, put } from "redux-saga/effects";
import { passwordCheckIdApi } from "../lib/api";

// 액션 타입 이름
export const PASSWORD_RESET_CHECK = "PASSWORD_RESET_CHECK";
export const PASSWORD_RESET_CHECK_RESET = "PASSWORD_RESET_CHECK_RESET";
export const PASSWORD_RESET_CHECK_SUCCESS = "PASSWORD_RESET_CHECK_SUCCESS";

// 액션 생성 함수
export const passwordResetCheck = (data: Object) => ({
  type: PASSWORD_RESET_CHECK,
  payload: data,
});

export const passwordResetCheckReset = () => ({
  type:PASSWORD_RESET_CHECK_RESET,
})

// 초기값
const initialState = {
  userid: "",
  phonenumber: "",
  isVerify: false,
};

// 사가
// 비밀번호 재설정을 위한 아이디 및 전화번호 인증관련 사가
export function* passwordResetCheckSaga(
  action: ReturnType<typeof passwordResetCheck>
): Generator<any, any, any> {
  try {
    const response = yield call<any>(passwordCheckIdApi, action.payload);
    yield put({ type: PASSWORD_RESET_CHECK_SUCCESS, payload: response });
  } catch (error) {
    console.log(error);
  }
}

export function passwordResetCheckReducer(
  state = initialState,
  action: { type: string; payload: object }
) {
  switch (action.type) {
    case PASSWORD_RESET_CHECK_SUCCESS:
      return { ...state, ...action.payload, isVerify: true }; 
    case PASSWORD_RESET_CHECK_RESET:
      return { ...state, isVerify: false }
    default:
      return state;
  }
}
