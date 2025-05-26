import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk'; // ✅ Correct named import
import userReducer from '../reducers/authReducer';
import loginUserReducer from '../reducers/loginReducer';
import productReducer from '../reducers/InventoryReducer';

const rootReducer = combineReducers({
  userRegister: userReducer,
  userLogin: loginUserReducer,
  addInventory: productReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
