import { createSlice } from "@reduxjs/toolkit";
const initialHeaderState = {
  collapsed: true,
};

const headerSlice = createSlice({
  name: "header",
  initialState: initialHeaderState,
  reducers: {
    setHeaderState(state, action) {
      const { collapsed = true } = action.payload;
      state.collapsed = collapsed;
    },
  },
});

export const { setHeaderState } = headerSlice.actions;

export default headerSlice.reducer;
