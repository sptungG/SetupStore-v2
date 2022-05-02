import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { user: null, authtoken: null },
  reducers: {
    setCredentials(state, action) {
      const { user, authtoken } = action.payload;
      state.user = user;
      state.authtoken = authtoken;
    },
  },
});

export const { setCredentials } = userSlice.actions;

export default userSlice.reducer;

export const selectCurrentUser = (state: any) => state.auth.user
