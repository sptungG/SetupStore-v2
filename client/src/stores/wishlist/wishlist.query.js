import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { bindParamsFilter } from "src/common/utils";
import { baseQueryWithReauth } from "../auth/auth.query";

// const baseQueryWithRetry = retry(baseQueryWithReauth, { maxRetries: 0 });

export const wishlistApi = createApi({
  reducerPath: "wishlistApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Wishlists"],
  endpoints: (builder) => ({
    getMyWishlist: builder.query({
      query: ({ userId, onModel }) => `/wishlist?${bindParamsFilter({ userId, onModel })}`,
      providesTags: ["Wishlists"],
    }),
    toggleProductWishlist: builder.mutation({
      query: (productId, initdata) => ({
        url: `/wishlist/product?productId=${productId}`,
        method: "PUT",
        body: initdata,
      }),
      invalidatesTags: ["Wishlists"],
    }),
    toggleComboWishlist: builder.mutation({
      query: (comboId, initdata) => ({
        url: `/wishlist/product?comboId=${comboId}`,
        method: "PUT",
        body: initdata,
      }),
      invalidatesTags: ["Wishlists"],
    }),
  }),
});
export const {
  useGetMyWishlistQuery,
  useToggleComboWishlistMutation,
  useToggleProductWishlistMutation,
} = wishlistApi;
