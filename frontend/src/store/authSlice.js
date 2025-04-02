import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  errorMessage: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.errorMessage = null;
    },

    loginFailure: (state, action) => {
      state.errorMessage = action.payload.errorMessage;
    },

    logoutSuccess: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.errorMessage = null;
    },
  },
});

export const { loginSuccess, loginFailure, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;
