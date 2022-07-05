import { createSlice } from "@reduxjs/toolkit";

const variantSlice = createSlice({
  name: "variant",
  initialState: { data: [] },
  reducers: {
    setVariant(state, action) {
      state.data = action.payload;
    },
  },
});

export const { setVariant } = variantSlice.actions;

export default variantSlice.reducer;
