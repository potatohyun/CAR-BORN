import { call, put } from "redux-saga/effects";
import { CompanyIdCheckApi, UserIdCheckApi } from "../lib/api";

// 액션 타입 이름
export const USERID_CHECK = "USERID_CHECK";
export const USERID_CHECK_SUCCESS = "USERID_CHECK_SUCCESS";
export const USERID_CHECK_FAILURE = "USERID_CHECK_FAILURE";
export const COMPANYID_CHECK = "COMPANYID_CHECK";
export const COMPANYID_CHECK_SUCCESS = "COMPANYID_CHECK_SUCCESS";
export const COMPANYID_CHECK_FAILURE = "COMPANYID_CHECK_FAILURE";

// 리듀서 초기화 하는 함수
export const USERID_CHECK_RESET = 'USERID_CHECK_RESET';
export const COMPANYID_CHECK_RESET = 'COMPANYID_CHECK_RESET';

// 액션 생성 함수
export const useridCheck = (id: string) => ({
  type: USERID_CHECK,
  payload: { id },
});

export const companyidCheck = (id: string) => ({
  type: COMPANYID_CHECK,
  payload: { id },
});

export const useridCheckReset  = () => ({
  type: USERID_CHECK_RESET,
});

export const companyidCheckReset = () => ({
  type: COMPANYID_CHECK_RESET,
});

// 초기값
const initialState = {
  idcheck: false,
};

//사가
// 유저 아이디 중복 체크
export function* UserIdCheckSaga(
  action: ReturnType<typeof useridCheck>
): Generator<any, any, any> {
  try {
    const response = yield call<any>(UserIdCheckApi, action.payload.id);
    
    if (response === false) {
      yield put({ 
        type: USERID_CHECK_FAILURE, 
        payload: { ...action.payload, success: response }
      });
    } else {
      yield put({ 
        type: USERID_CHECK_SUCCESS, 
        payload: { ...action.payload, success: response }
      });
    }
  } catch (error) {
    console.log(error);
  }
}

// 회사 아이디 중복 체크
export function* CompanyIdCheckSaga(
  action: ReturnType<typeof companyidCheck>
): Generator<any, any, any> {
  try {
    const response = yield call<any>(CompanyIdCheckApi, action.payload.id);
    
    if (response === false) {
      yield put({
        type: COMPANYID_CHECK_FAILURE,
        payload: { ...action.payload, success: response }
      });
    } else {
      yield put({
        type: COMPANYID_CHECK_SUCCESS,
        payload: { ...action.payload, success: response }
      });
    }
  } catch (error) {
    console.log(error);
  }
}


export function IdCheckReducer(
  state = initialState,
  action: { type: string; payload: { success: boolean } }
) {
  switch (action.type) {
    case USERID_CHECK_SUCCESS:
      return { ...state, useridcheck: action.payload.success };
    case USERID_CHECK_FAILURE:
      return { ...state, useridcheck: action.payload.success };
    case COMPANYID_CHECK_SUCCESS:
      return { ...state, companyidcheck: action.payload.success };
    case COMPANYID_CHECK_FAILURE:
      return { ...state, companyidcheck: action.payload.success };
    case USERID_CHECK_RESET:
      return { ...state, useridcheck: null};
    case COMPANYID_CHECK_RESET:
      return { ...state, companyidcheck: null};
    default:
      return state;
  }
}
