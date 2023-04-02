import { call, put } from "redux-saga/effects";
import { createInspectorReviewApi, createRepairReviewApi } from './../lib/api';

// 액션 이름
export const CREATE_INSPECTOR_REVIEW_REQUEST = "CREATE_INSPECTOR_REVIEW_REQUEST";
export const CREATE_INSPECTOR_REVIEW_SUCCESS = "CREATE_INSPECTOR_REVIEW_SUCCESS";
export const CREATE_REPAIR_REVIEW_REQUEST = "CREATE_REPAIR_REVIEW_REQUEST";
export const CREATE_REPAIR_REVIEW_SUCCESS = "CREATE_REPAIR_REVIEW_SUCCESS";

// 액션 생성 함수
export const createInspectorReviewAction = ({reviewInput, rating, carId}: any) => ({
  type: CREATE_INSPECTOR_REVIEW_REQUEST,
  payload: { reviewInput, rating, carId },
});

export const createRepairReviewAction = ({reviewInput, rating, carId}: any) => ({
  type: CREATE_REPAIR_REVIEW_REQUEST,
  payload: { reviewInput, rating, carId },
});

// 검수 리뷰 보내기 사가
export function* createInspectorReviewSaga(
  action: ReturnType<typeof createInspectorReviewAction>
): Generator<any, any, any> {
  try {
    const response = yield call(createInspectorReviewApi, action.payload)
    console.log(response)
    yield put({
      type: CREATE_INSPECTOR_REVIEW_SUCCESS,
      payload: response
    });
  } catch (error) {
    console.log(error);
  }
}

// 정비 리뷰 보내기 사가
export function* createRepairReviewSaga(
  action: ReturnType<typeof createRepairReviewAction>
): Generator<any, any, any> {
  try {
    const response = yield call(createRepairReviewApi, action.payload)
    yield put({
      type: CREATE_REPAIR_REVIEW_SUCCESS,
      payload: response
    });
  } catch (error) {
    console.log(error);
  }
}

// 정비 및 검수 관련 리듀서
export function createReviewReducer(
  state = { isReview: false },
  action: { type: string; payload: any}
) {
  switch (action.type) {
    case CREATE_INSPECTOR_REVIEW_SUCCESS:
      return { ...state, ...action.payload, isReview:true}
    case CREATE_REPAIR_REVIEW_SUCCESS:
      return { ...state, ...action.payload, isReview:true}
    default:
      return state;
  }
}