import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import userReducer from '../reducers/authReducer';
import loginUserReducer from '../reducers/loginReducer';
import {productReducer, updateInventoryReducer, updateProductReducer} from '../reducers/InventoryReducer';

const rootReducer = combineReducers({
  userRegister: userReducer,
  userLogin: loginUserReducer,
  addInventory: productReducer,
  updateProductStore: updateProductReducer,
  updateInventory: updateInventoryReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
