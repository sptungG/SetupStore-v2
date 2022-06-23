import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { bindParamsFilter } from "src/common/utils";
import { baseQueryWithReauth } from "../auth/auth.query";

// const baseQueryWithRetry = retry(baseQueryWithReauth, { maxRetries: 0 });

export const combosApi = createApi({
  reducerPath: "combosApi",
  baseQuery: baseQueryWithReauth,
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
