import { call, put } from "redux-saga/effects";
import { newPasswordApi } from "../lib/api";

// 액션 타입 이름
export const NEWPASSWORD_REQUEST = "NEWPASSWORD_REQUEST";
export const NEWPASSWORD_RESET = "NEWPASSWORD_RESET";
export const NEWPASSWORD_REQUEST_SUCCESS = "NEWPASSWORD_REQUEST_SUCCESS";

// 액션 생성 함수
export const newPasswordAction = (data: Object) => ({
  type: NEWPASSWORD_REQUEST,
  payload: data,
});


export const newPasswordReset = () => ({
  type: NEWPASSWORD_RESET
})

// 초기값
const initialState = {
  newpassword: "",
  newpasswordcheck: null,
};

// 사가
// 새로운 비밀번호 재설정 사가
export function* newPasswordSaga(
  action: ReturnType<typeof newPasswordAction>
): Generator<any, any, any> {
  console.log(action.payload)
  try {
    const response = yield call<any>(newPasswordApi, action.payload);
    console.log(response)

    yield put({ type: NEWPASSWORD_REQUEST_SUCCESS, payload: response.data.message})
  } catch (error) {
    console.log(error);
  }
}

export function newPasswordReducer(
  state = initialState,
  action: { type: string; payload: object }
) {
  switch (action.type) {
    case NEWPASSWORD_REQUEST_SUCCESS:
      return { ...state, ...action.payload, newpasswordcheck:true };
    case NEWPASSWORD_RESET:
      return { ...state, newpasswordcheck:false }
    default:
      return state;
  }
}
