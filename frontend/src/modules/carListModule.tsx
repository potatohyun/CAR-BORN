const SET_SORT_TYPE: string = "carListModule/SET_SORT_TYPE";
const SET_KEYWORD: string = "carListModule/SET_KEYWORD";
const SET_KEYWORD_TYPE: string = "carListModule/SET_KEYWORD_TYPE";

export const setSortType = (data: string) => {
  return {
    type: SET_SORT_TYPE,
    payload: data,
  };
};

export const setKeyword = (data: string) => {
  return {
    type: SET_KEYWORD,
    payload: data,
  };
};

export const setKeywordType = (data: string) => {
  return {
    type: SET_KEYWORD_TYPE,
    payload: data,
  };
};

export interface StateType {
  sortType: string;
  keywordType: string;
  keyword: string;
}

const initialState: StateType = {
  sortType: "0",
  keywordType: "",
  keyword: "",
};

export const carListReducer = (
  state: StateType = initialState,
  action: { type: string; payload: object }
) => {
  switch (action.type) {
    case SET_SORT_TYPE:
      return { ...state, sortType: action.payload };
    case SET_KEYWORD:
      return { ...state, keyword: action.payload };
    case SET_KEYWORD_TYPE:
      return { ...state, keywordType: action.payload };
    default:
      return state;
  }
};
