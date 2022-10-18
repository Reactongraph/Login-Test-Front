import { combineReducers } from '@reduxjs/toolkit';
import { loginReducer } from './pages';

const createRootReducer = (injectedReducers = {}) =>
  combineReducers({
    ...injectedReducers,
    loginState: loginReducer, //login reducer slice
  });

export { createRootReducer };
