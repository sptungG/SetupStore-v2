import { createSlice } from "@reduxjs/toolkit";
const initialHeaderState = {
  sidevisible: false,
};

const headerSlice = createSlice({
  name: "header",
  initialState: initialHeaderState,
  reducers: {
    setSidebarCollapsed(state, action) {
      state.sidevisible = action.payload;
    },
  },
});

export const { setSidebarCollapsed } = headerSlice.actions;

export default headerSlice.reducer;
