import { createSlice } from "@reduxjs/toolkit";
const initialHeaderState = {
  sidevisible: false,
  searchvisible: false,
  dataRedirectStatus: "noLoading",
};

const headerSlice = createSlice({
  name: "header",
  initialState: initialHeaderState,
  reducers: {
    setSidebarCollapsed(state, action) {
      state.sidevisible = action.payload;
    },
    setSearchVisible(state, action) {
      state.searchvisible = action.payload;
    },
    setDataRedirectStatus(state, action) {
      state.dataRedirectStatus = action.payload;
    },
  },
});

export const { setSidebarCollapsed, setDataRedirectStatus, setSearchVisible } = headerSlice.actions;

export default headerSlice.reducer;
