import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { bindParamsFilter } from "src/common/utils";
import { baseQueryWithReauth } from "../auth/auth.query";

// const baseQueryWithRetry = retry(baseQueryWithReauth, { maxRetries: 0 });

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    getProductsFiltered: builder.query({
      query: (filter) => `/products?${bindParamsFilter(filter)}`,
      providesTags: ["Products"],
    }),
    // currentUser: builder.mutation({
    //   query: (authtoken) => ({
    //     url: "/current-user",
    //     method: "POST",
    //     headers: {
    //       authtoken,
    //     },
    //   }),
    //   invalidatesTags: ["Products"],
    // }),
    // updateTask: builder.mutation({
    //   query: ({ id, ...rest }) => ({
    //     url: `/tasks/${id}`,
    //     method: "PUT",
    //     body: rest,
    //   }),
    //   invalidatesTags: ["Products"],
    // }),
    // deleteTask: builder.mutation({
    //   query: (id) => ({
    //     url: `/tasks/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["Products"],
    // }),
  }),
});
export const { useGetProductsFilteredQuery } = productsApi;
