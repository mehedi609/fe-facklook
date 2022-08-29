import { createSlice } from '@reduxjs/toolkit';

export const userSlicer = createSlice({
  name: 'user',
  initialState: {
    value: 0,
  },
  reducers: {
    login: (state, action) => {
      state.value = 2;
    },
  },
});

export const { login } = userSlicer.actions;
export const userReducer = userSlicer.reducer;
