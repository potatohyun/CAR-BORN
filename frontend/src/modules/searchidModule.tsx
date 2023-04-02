import { call, put } from "redux-saga/effects";
import { SearchIdCheckApi } from "../lib/api";

// 액션 타입 이름
export const SEARCHID_CHECK = "SEARCHID_CHECK";
export const SEARCHID_CHECK_SUCCESS = "SEARCHID_CHECK_SUCCESS";
export const SEARCHID_VERIFY_RESET = "SEARCHID_VERIFY_RESET";

// 액션 생성 함수
export const SearchIDCheckAction = (data: Object) => ({
  type: SEARCHID_CHECK,
  payload: data,
});

export const SearchIDVerifyReset = () => ({
  type: SEARCHID_VERIFY_RESET,
});

// 초기값
const initialState = {
  name: "",
  phonenumber: "",
  isVerify: false,
};

// 사가
// 유저 아이디 중복 체크
export function* searchidCheckSaga(
  action: ReturnType<typeof SearchIDCheckAction>
): Generator<any, any, any> {
  try {
    const response = yield call<any>(SearchIdCheckApi, action.payload);
    console.log("response값은? ", response.data.message);
    yield put({ type: SEARCHID_CHECK_SUCCESS, payload: response.data.message });
  } catch (error) {
    console.log(error);
  }
}

export function searchIDCheckReducer(
  state = initialState,
  action: { type: string; payload: object }
) {
  switch (action.type) {
    case SEARCHID_CHECK_SUCCESS:
      return { ...state, searchid:action.payload, verify: true };
    case SEARCHID_VERIFY_RESET:
      return { verify: false };
    default:
      return state;
  }
}
