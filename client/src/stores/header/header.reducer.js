import { createSlice } from "@reduxjs/toolkit";
const initialHeaderState = {
  sidevisible: false,
  dataRedirectStatus: "noLoading",
};

const headerSlice = createSlice({
  name: "header",
  initialState: initialHeaderState,
  reducers: {
    setSidebarCollapsed(state, action) {
      state.sidevisible = action.payload;
    },
    setDataRedirectStatus(state, action) {
      state.dataRedirectStatus = action.payload;
    },
  },
});

export const { setSidebarCollapsed, setDataRedirectStatus } = headerSlice.actions;

export default headerSlice.reducer;
