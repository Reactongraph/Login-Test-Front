import { createSlice } from '@reduxjs/toolkit';
import { loginThunk } from './thunk';

export const initialState = {
  loading: false,
  isAuthenticated: false,
  user: {},
  token: '',
  error: {},
};

export const loginSlice = createSlice({
  name: 'loginState',
  initialState,
  reducers: {
    removeError(state) {
      state.error = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.login.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(loginThunk.login.fulfilled, (state, { payload }) => {
        return {
          ...state,
          loading: false,
          token: payload.token,
          user: payload.user,
          isAuthenticated: true,
        };
      })
      .addCase(loginThunk.login.rejected, (state, payload) => {
        return {
          ...state,
          loading: false,
          error: payload.error,
        };
      })
      .addCase(loginThunk.logout.fulfilled, (state) => {
        return {
          ...state,
          loading: false,
          token: '',
          user: {},
          isAuthenticated: false,
        };
      })
      .addCase(loginThunk.signup.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(loginThunk.signup.fulfilled, (state, { payload }) => {
        return {
          ...state,
          loading: false,
          user: payload,
          error: {},
        };
      })
      .addCase(loginThunk.signup.rejected, (state, payload) => ({
        ...state,
        loading: false,
        error: payload.error,
      }));
  },
});

export const {
  reducer: loginReducer,
  name: loginSliceKey,
  actions: loginSliceAction,
} = loginSlice;
