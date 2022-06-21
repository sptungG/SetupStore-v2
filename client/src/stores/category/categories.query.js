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

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: baseQueryWithRetry,
  tagTypes: ["Categories"],
  endpoints: (builder) => ({
    getAllCategoriesFiltered: builder.query({
      query: (filter) => `/categories?${bindParamsFilter(filter)}`,
      providesTags: ["Categories"],
    }),
    // currentUser: builder.mutation({
    //   query: (authtoken) => ({
    //     url: "/current-user",
    //     method: "POST",
    //     headers: {
    //       authtoken,
    //     },
    //   }),
    //   invalidatesTags: ["Categories"],
    // }),
    // updateTask: builder.mutation({
    //   query: ({ id, ...rest }) => ({
    //     url: `/tasks/${id}`,
    //     method: "PUT",
    //     body: rest,
    //   }),
    //   invalidatesTags: ["Categories"],
    // }),
    // deleteTask: builder.mutation({
    //   query: (id) => ({
    //     url: `/tasks/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["Categories"],
    // }),
  }),
});
export const { useGetAllCategoriesFilteredQuery } = categoriesApi;
