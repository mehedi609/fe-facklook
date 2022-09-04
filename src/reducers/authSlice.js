import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import { STATUS } from 'utils/requestStatus';

export const signUp = createAsyncThunk(
  'users/signUp',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/register`,
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
        `${process.env.REACT_APP_API_URL}/auth/login`,
        userData,
      );
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data.message);
    }
  },
);

export const activateAccount = createAsyncThunk(
  'users/activateAccount',
  async ({ token, user }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/activate`,
        { token },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      );
      return response.data.message;
    } catch (e) {
      return rejectWithValue(e.response.data.message);
    }
  },
);

export const resendEmailVerification = createAsyncThunk(
  'users/resendEmailVerification',
  async ({ user }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/reSendVerification`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      );
      return response.data.message;
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
  reducers: {
    signOut(state) {
      state.loggedInUser = null;
      state.status = '';
      state.message = '';
    },
  },
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
      })
      .addCase(activateAccount.fulfilled, (state, action) => {
        state.loggedInUser.verified = true;
        state.message = action.payload;
        state.status = STATUS.success;
      })
      .addCase(activateAccount.rejected, (state, action) => {
        state.message = action.payload;
        state.status = STATUS.failure;
      })
      .addCase(resendEmailVerification.pending, (state) => {
        state.message = '';
        state.status = STATUS.loading;
      })
      .addCase(resendEmailVerification.fulfilled, (state, action) => {
        state.message = action.payload;
        state.status = STATUS.success;
      })
      .addCase(resendEmailVerification.rejected, (state, action) => {
        state.message = action.payload;
        state.status = STATUS.failure;
      });
  },
});

export const { signOut } = authSlicer.actions;
export const authReducer = authSlicer.reducer;
