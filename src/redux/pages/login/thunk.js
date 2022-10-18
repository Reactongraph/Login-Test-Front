import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { BASE_URL } from '../../apiUrl';

export const loginThunk = {
  login: createAsyncThunk('login', async (formData) => {
    const { email, password } = formData;
    const { data } = await axios.post(`${BASE_URL}/users/signin`, {
      email,
      password,
    });

    localStorage.setItem('token', data?.data?.token);
    // window.location('/dashboard', '_self');
    return data?.data;
  }),
  logout: createAsyncThunk('logout', () => {
    localStorage.clear();
  }),
  signup: createAsyncThunk('signup', async (formData) => {
    const { email, password } = formData;
    const { data } = await axios.post(`${BASE_URL}/users/signup`, {
      email,
      password,
    });

    return data?.data;
  }),
};
