import { call, put } from "redux-saga/effects";
import { GetAgreementApi } from "../lib/api";

// 약관 타입 정의
export interface AgreementType {
  website?: string;
  privacy?: string;
}

// 액션 타입 이름
export const GET_TERMSOFUSE = 'GET_TERMSOFUSE';
export const GET_TERMSOFUSE_SUCCESS = 'GET_TERMSOFUSE_SUCCESS';

// 액션 타입 생성 함수
export const GetAgreementAction = () => ({
  type: GET_TERMSOFUSE
});

export const GetAgreementActionSuccess = (agreement: AgreementType) => ({
  type: GET_TERMSOFUSE_SUCCESS,
  payload: agreement,
});

// 초기값
const initialState = {
  website: '',
  privacy: '',
};

// 사가
export function* GetAgreementSaga(): Generator<any, void, unknown>  {
  try {
    const agreement: any = yield call(GetAgreementApi);

    yield put(GetAgreementActionSuccess(agreement));
  } catch (error) {
    console.log(error)
  }
}

// 리듀서
export function GetAgreementReducer(state=initialState, action: {type: string, payload: object}) {
  switch (action.type) {
    case GET_TERMSOFUSE_SUCCESS:
      return { ...state, ...action.payload }
    default:
      return state;
  }
}