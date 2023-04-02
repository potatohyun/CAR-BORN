import { call, put } from "redux-saga/effects";
import { userinfoDeleteApi } from "../lib/api";

// 액션 타입 이름
export const USERINFO_DELETE = "USERINFO_DELETE";
export const USERINFO_DELETE_SUCCESS = "USERINFO_DELETE_SUCCESS";
export const USERINFO_DELETE_RESET = "USERINFO_DELETE_RESET";

// 액션 생성 함수
export const userinfoDelete = () => ({
  type: USERINFO_DELETE,
});

export const userInfoDeleteSuccess = () => ({
  type: USERINFO_DELETE_SUCCESS,
});

export const userInfoDeleteReset = () => ({
  type: USERINFO_DELETE_RESET
})

// 초기값(리듀서)
const initialState = {
  isLoading: false,
  response: null,
  error: null,
};

// 사가
// 유저 정보 삭제 사가
export function* userinfoDeleteSaga(): Generator<any, any, any> {
  const ObjString:any = yield localStorage.getItem('login-token');
  const Obj = yield ObjString ? JSON.parse(ObjString) : null;
  try {
    const response = yield call(userinfoDeleteApi, Obj.userId)
    yield put({ type: USERINFO_DELETE_SUCCESS, payload: response });
  } catch (error) {
    console.error(error);
  }
}

export function userinfoDeleteReducer(
  state = initialState,
  action: { type: string; payload: object }
) {
  switch (action.type) {
    case USERINFO_DELETE:
      return { ...state, isLoading: true, error: null };
    case USERINFO_DELETE_SUCCESS:
      return { ...state, isLoading: false, success: true };
    case USERINFO_DELETE_RESET:
      return { ...state, isLoading: false, success: false }
    default:
      return state;
  }
}
