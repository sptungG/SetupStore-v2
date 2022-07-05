import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: { data: [] },
  reducers: {
    setWishlist(state, action) {
      state.data = action.payload;
    },
  },
});

export const { setWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
