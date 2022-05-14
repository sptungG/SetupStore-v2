import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: { mode: "light" , locale: "vi", collapsed: true },
  reducers: {
    setTheme(state, action) {
      state.mode = action.payload;
    },
    setLocale(state, action) {
      state.locale = action.payload;
    },
    setCollapsed(state, action) {
      state.collapsed = action.payload;
    },
  },
});

export const { setTheme, setLocale, setCollapsed} = themeSlice.actions;

export default themeSlice.reducer;
