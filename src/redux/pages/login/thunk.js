import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { BASE_URL } from "../../apiUrl";

const config = {
  headers: {
    // "Content-Type": "application/json",
    Authorization: `Bearer `,
  },
};

export const loginThunk = {
  login: createAsyncThunk("login", async (formData) => {
    const { email, password } = formData;
    console.log("formData", formData);
    const { data } = await axios.post(`${BASE_URL}/users/signin`, {
      email,
      password,
    });
    window.localStorage.setItem("token", data?.data?.token);
    window.location("/dashboard", "_self");
    return data?.data;
  }),
  logout: createAsyncThunk("logout", () => {
    localStorage.clear();
  }),
  signup: createAsyncThunk("signup", async (formData) => {
    const { email, password } = formData;
    const { data } = await axios.post(`${BASE_URL}/users/signup`, {
      email,
      password,
    });
    window.location("/", "_self");

    return data?.data;
  }),
};
