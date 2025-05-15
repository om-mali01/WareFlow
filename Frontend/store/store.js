import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk'; // ✅ Correct named import
import userReducer from '../reducers/authReducer';
import loginUserReducer from '../reducers/loginReducer';

const rootReducer = combineReducers({
  userRegister: userReducer,
  userLogin: loginUserReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
