import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { bindParamsFilter } from "src/common/utils";
import { baseQueryWithReauth } from "../auth/auth.query";

// const baseQueryWithRetry = retry(baseQueryWithReauth, { maxRetries: 0 });

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    getProductsFiltered: builder.query({
      query: (filter) => `/products?${bindParamsFilter(filter)}`,
      providesTags: ["Products"],
    }),
    getProduct: builder.query({
      query: (productId) => `/product/${productId}`,
      providesTags: ["Products"],
    }),
    productViewInc: builder.mutation({
      query: (productId) => ({
        url: `/product/${productId}/view`,
        method: "PUT",
      }),
      invalidatesTags: ["Products"],
    }),
    // ADMIN
    getAllProductsFiltered: builder.query({
      query: (filter) => `/admin/products?${bindParamsFilter(filter)}`,
      providesTags: ["Products"],
    }),
    // ADMIN
    createProduct: builder.mutation({
      query: (initdata) => ({
        url: `/admin/product`,
        method: "POST",
        body: initdata,
      }),
      invalidatesTags: ["Products"],
    }),
    // ADMIN
    updateProduct: builder.mutation({
      query: (productId, initdata) => ({
        url: `/admin/product?productId=${productId}`,
        method: "PUT",
        body: initdata,
      }),
      invalidatesTags: ["Products"],
    }),
    // ADMIN
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `/admin/product?productId=${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});
export const {
  useGetProductsFilteredQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetAllProductsFilteredQuery,
  useGetProductQuery,
  useProductViewIncMutation,
  useUpdateProductMutation,
} = productApi;
