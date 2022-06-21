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

export const combosApi = createApi({
  reducerPath: "combosApi",
  baseQuery: baseQuery,
  tagTypes: ["Combos"],
  endpoints: (builder) => ({
    getCombosFiltered: builder.query({
      query: (filter) => `/combos?${bindParamsFilter(filter)}`,
      providesTags: ["Combos"],
    }),
    // currentUser: builder.mutation({
    //   query: (authtoken) => ({
    //     url: "/current-user",
    //     method: "POST",
    //     headers: {
    //       authtoken,
    //     },
    //   }),
    //   invalidatesTags: ["Combos"],
    // }),
    // updateTask: builder.mutation({
    //   query: ({ id, ...rest }) => ({
    //     url: `/tasks/${id}`,
    //     method: "PUT",
    //     body: rest,
    //   }),
    //   invalidatesTags: ["Combos"],
    // }),
    // deleteTask: builder.mutation({
    //   query: (id) => ({
    //     url: `/tasks/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["Combos"],
    // }),
  }),
});
export const { useGetCombosFilteredQuery } = combosApi;
