import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { bindParamsFilter } from "src/common/utils";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API,
  prepareHeaders: (headers, { getState }) => {
    //  By default, if we have a token in the store, let's use that for authenticated requests
    const authtoken = getState().auth.authtoken;
    if (authtoken) {
      headers.set("authtoken", authtoken);
    }
    return headers;
  },
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 0 });

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: baseQuery,
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
