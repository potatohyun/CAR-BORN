import { call, put, takeEvery } from "redux-saga/effects";
import { loginApi } from "../lib/loginApi";

// 타입 지정
export interface User {
  userid?: string;
  userpassword?: string;
  status?: number;
  success?: boolean;
}

// 액션 타입 이름
export const LOGIN_TRY = "LOGIN_TRY";
export const LOGIN_TRY_SUCCESS = "LOGIN_TRY_SUCCESS";
export const GET_USER_TOKEN = "GET_USER_TOKEN";

// 액션 타입 생성 함수
export const loginTry = (user: User) => ({
  type: LOGIN_TRY,
  payload: user,
});

export const loginTrySuccess = (user: User) => ({
  type: LOGIN_TRY_SUCCESS,
  payload: user,
});

// 초기값
const initialState = {
  users: [],
};

type Action = ReturnType<typeof loginTry> | ReturnType<typeof loginTrySuccess>;

// 사가
function* loginSaga(action: Action) {
  try {
    const response: User = yield call<typeof loginApi>(loginApi, action.payload);
    
    // if (user.status === 200) {
    //   const obj = {
    //     value: user,
    //     // value: user.data.accessToken,
    //     expire: Date.now() + 1800000,
    //     userId: user.userid,
    //   };

    //   // 객체를 JSON 문자열로 변환
    //   const objString = JSON.stringify(obj);
    //   localStorage.setItem("login-token", objString);


    //   yield put({
    //     type: GET_USER_TOKEN,
    //     success: true,
    //   });
    // }  

    yield put({type: LOGIN_TRY_SUCCESS, payload: { ...response, success: true}});
  } catch (error) {
    console.log(error);
  }
}

export function* rootSaga() {
  yield takeEvery(LOGIN_TRY, loginSaga);
}

// 리듀서
export function loginReducer(state = initialState, action: Action) {
  switch (action.type) {
    case LOGIN_TRY_SUCCESS:
      console.log(action.payload)
      return { ...state, users: action.payload };
    default:
      return state;
  }
}
