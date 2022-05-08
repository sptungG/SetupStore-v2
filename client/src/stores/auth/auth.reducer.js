import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, emailVerifiedValue: "" },
  reducers: {
    setUserCredential(state, action) {
      state.user = action.payload;
    },
    setEmailVerifiedValue(state, action) {
      state.emailVerifiedValue = action.payload;
    },
  },
});

export const { setUserCredential, setEmailVerifiedValue } = authSlice.actions;

export default authSlice.reducer;
