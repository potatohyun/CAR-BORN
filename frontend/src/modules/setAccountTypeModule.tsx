export const SET_ACCOUNTTYPE = 'SET_ACCOUNTTYPE'

export const setUserAccountType = (account:number) => ({
  type: SET_ACCOUNTTYPE,
  payload: account
})

const initialState = {
  accountType: 0
}

export const setAccountTypeReducer = (state=initialState, action: {type: string, payload: object}) => {
  switch (action.type) {
    case SET_ACCOUNTTYPE:
      return { ...state, accountType : action.payload }
    default:
      return state;
  }
}