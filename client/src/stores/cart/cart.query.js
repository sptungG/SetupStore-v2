import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { bindParamsFilter } from "src/common/utils";
import { baseQueryWithReauth } from "../auth/auth.query";

// const baseQueryWithRetry = retry(baseQueryWithReauth, { maxRetries: 0 });

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    getMyCart: builder.query({
      query: () => `/cart/products`,
      providesTags: ["Cart"],
    }),
    addProductToCart: builder.mutation({
      query: ({ productId, variantId, quantity }) => ({
        url: "/cart/product",
        method: "POST",
        body: { productId, variantId, quantity },
      }),
      invalidatesTags: ["Cart"],
    }),
    removeProductFromCart: builder.mutation({
      query: ({ productId, variantId }) => ({
        url: `/cart/product`,
        method: "DELETE",
        body: { productId, variantId },
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});
export const { useAddProductToCartMutation, useGetMyCartQuery, useRemoveProductFromCartMutation } =
  cartApi;
