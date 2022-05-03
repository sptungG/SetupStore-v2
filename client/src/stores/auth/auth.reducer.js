import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, authtoken: null },
  reducers: {
    setUserCredential(state, action) {
      const { user, authtoken } = action.payload;
      state.user = user;
      state.authtoken = authtoken;
    },
  },
});

export const { setUserCredential } = authSlice.actions;

export default authSlice.reducer;
