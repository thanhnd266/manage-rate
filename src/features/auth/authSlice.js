import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: {
      accessToken: null,
      refreshToken: null,
      expiresIn: null,
    },
    isRefreshTokenExpired: false,
    permissions: []
  },
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken, refreshToken, expiresIn } = action.payload;
      state.token = {
        accessToken,
        refreshToken,
        expiresIn,
      };
      state.permissions = action.payload.permissions; 
    },
    checkRefreshExpired: (state, action) => {
      state.isRefreshTokenExpired = action.payload;
    },
    logOut: (state, action) => {
      state.token = null;
    },
  },
});

export const { setCredentials, checkRefreshExpired, logOut } = authSlice.actions;

export default authSlice.reducer;
