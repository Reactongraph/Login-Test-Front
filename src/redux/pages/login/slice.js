import { createSlice } from "@reduxjs/toolkit";
import { loginThunk } from "./thunk";

export const initialState = {
  loading: false,
  isAuthenticated: false,
  user: {},
  token: "",
  error: "",
};

export const loginSlice = createSlice({
  name: "loginState",
  initialState,
  reducers: {},
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
      .addCase(loginThunk.login.rejected, (state, { payload }) => ({
        ...state,
        loading: false,
        error: payload,
      }))
      .addCase(loginThunk.logout.fulfilled, (state) => {
        return {
          ...state,
          loading: false,
          token: "",
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
          user: payload.user,
        };
      })
      .addCase(loginThunk.signup.rejected, (state, { payload }) => ({
        ...state,
        loading: false,
        error: payload,
      }));
  },
});

export const {
  reducer: loginReducer,
  name: loginSliceKey,
  actions: loginSliceAction,
} = loginSlice;
