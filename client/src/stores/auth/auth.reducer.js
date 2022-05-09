import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, authtoken: null, emailVerifiedValue: "" },
  reducers: {
    setUserCredential(state, action) {
      const {user, authtoken} = action.payload
      state.user = user;
      state.authtoken = authtoken;
    },
    setEmailVerifiedValue(state, action) {
      state.emailVerifiedValue = action.payload;
    },
  },
});

export const { setUserCredential, setEmailVerifiedValue } = authSlice.actions;

export default authSlice.reducer;
