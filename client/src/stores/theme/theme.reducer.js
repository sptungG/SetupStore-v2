import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: { mode: "light" , locale: "vi" },
  reducers: {
    setTheme(state, action) {
      state.mode = action.payload;
    },
    setLocale(state, action) {
      state.locale = action.payload;
    },
  },
});

export const { setTheme, setLocale } = themeSlice.actions;

export default themeSlice.reducer;
