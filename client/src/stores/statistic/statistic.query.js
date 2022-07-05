import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { bindParamsFilter } from "src/common/utils";
import { baseQueryWithReauth } from "../auth/auth.query";

// const baseQueryWithRetry = retry(baseQueryWithReauth, { maxRetries: 0 });

export const statisticApi = createApi({
  reducerPath: "statisticApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Statistics"],
  endpoints: (builder) => ({
    getUsersStats: builder.query({
      query: ({ begin, end }) => `/stats/users?${bindParamsFilter({ begin, end })}`,
      providesTags: ["Statistics"],
    }),
    getVariantsStats: builder.query({
      query: ({ begin, end }) => `/stats/variants?${bindParamsFilter({ begin, end })}`,
      providesTags: ["Statistics"],
    }),
    getIncomeStats: builder.query({
      query: ({ productId, begin, end }) =>
        `/stats/income?${bindParamsFilter({ productId, begin, end })}`,
      providesTags: ["Statistics"],
    }),
  }),
});
export const { useGetIncomeStatsQuery, useGetUsersStatsQuery, useGetVariantsStatsQuery } =
  statisticApi;
