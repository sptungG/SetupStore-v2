import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: { value: "dark" || "light" , locale: "vi" || "en" },
  reducers: {
    setTheme(state, action) {
      state.value = action.payload;
    },
    setLocale(state, action) {
      state.locale = action.payload;
    },
  },
});

export const { setTheme, setLocale } = themeSlice.actions;

export default themeSlice.reducer;
