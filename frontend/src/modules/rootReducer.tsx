import { combineReducers } from 'redux';
import { loginReducer } from '../modules/loginModule';

const rootReducer = combineReducers({
  login: loginReducer
});

export default rootReducer;