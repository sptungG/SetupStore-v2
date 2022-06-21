import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, authtoken: null, refreshToken: null, emailVerifiedValue: "" },
  reducers: {
    setUserCredential(state, action) {
      state.user = action.payload;
    },
    setRefreshToken(state, action) {
      state.refreshToken = action.payload;
    },
    setAuthtokenCredential(state, action) {
      state.authtoken = action.payload;
    },
    setEmailVerifiedValue(state, action) {
      state.emailVerifiedValue = action.payload;
    },
  },
});

export const { setUserCredential, setEmailVerifiedValue, setAuthtokenCredential, setRefreshToken } = authSlice.actions;

export default authSlice.reducer;
