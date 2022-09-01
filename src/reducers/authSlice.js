import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import { STATUS } from '../utils';

export const signUp = createAsyncThunk(
  'users/signUp',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/register`,
        userData,
      );
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data.message);
    }
  },
);

export const signIn = createAsyncThunk(
  'users/signIn',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/login`,
        userData,
      );
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data.message);
    }
  },
);

export const authSlicer = createSlice({
  name: 'users',
  initialState: {
    status: '',
    message: '',
    loggedInUser: Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.status = STATUS.loading;
        state.message = '';
      })
      .addCase(signUp.fulfilled, (state, action) => {
        const { message, ...rest } = action.payload;
        state.loggedInUser = rest;
        state.status = STATUS.success;
        state.message = message;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.status = STATUS.failure;
        state.message = action.payload;
      })
      .addCase(signIn.pending, (state) => {
        state.status = STATUS.loading;
        state.message = '';
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loggedInUser = action.payload;
        state.status = STATUS.success;
        state.message = '';
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = STATUS.failure;
        state.message = action.payload;
      });
  },
});

export const authReducer = authSlicer.reducer;
