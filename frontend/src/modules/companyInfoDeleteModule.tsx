import { call, put } from "redux-saga/effects";
import { companyinfoDeleteApi } from "../lib/api";

// 액션 타입 이름
export const COMPANYINFO_DELETE = "COMPANYINFO_DELETE";
export const COMPANYINFO_DELETE_SUCCESS = "COMPANYINFO_DELETE_SUCCESS";
export const COMPANYINFO_DELETE_RESET = "COMPANYINFO_DELETE_RESET";

// 액션 생성 함수
export const companyinfoDelete = () => ({
  type: COMPANYINFO_DELETE,
});

export const companyInfoDeleteSuccess = () => ({
  type: COMPANYINFO_DELETE_SUCCESS,
});

export const companyInfoDeleteReset = () => ({
  type: COMPANYINFO_DELETE_RESET
})

// 초기값(리듀서)
const initialState = {
  isLoading: false,
  response: null,
  error: null,
};

// 사가
// 유저 정보 삭제 사가
export function* companyinfoDeleteSaga(): Generator<any, any, any> {
  const ObjString:any = yield localStorage.getItem('login-token');
  const Obj = yield ObjString ? JSON.parse(ObjString) : null;
  try {
    const response = yield call(companyinfoDeleteApi, Obj.userId)
    yield put({ type: COMPANYINFO_DELETE_SUCCESS, payload: response });
  } catch (error) {
    console.error(error);
  }
}

export function companyinfoDeleteReducer(
  state = initialState,
  action: { type: string; payload: object }
) {
  switch (action.type) {
    case COMPANYINFO_DELETE:
      return { ...state, isLoading: true, error: null };
    case COMPANYINFO_DELETE_SUCCESS:
      return { ...state, isLoading: false, success: true };
    case COMPANYINFO_DELETE_RESET:
      return { ...state, isLoading: false, success: false }
    default:
      return state;
  }
}
