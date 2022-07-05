import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { bindParamsFilter } from "src/common/utils";
import { baseQueryWithReauth } from "../auth/auth.query";

// const baseQueryWithRetry = retry(baseQueryWithReauth, { maxRetries: 0 });

export const reviewApi = createApi({
  reducerPath: "reviewApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Reviews"],
  endpoints: (builder) => ({
    getReviewsFiltered: builder.query({
      query: (filter) => `/reviews?${bindParamsFilter(filter)}`,
      providesTags: ["Reviews"],
    }),
    getReviewsByProduct: builder.query({
      query: (productId, filter) => `/product/${productId}/reviews?${bindParamsFilter(filter)}`,
      providesTags: ["Reviews"],
    }),
    getReviewsByCombo: builder.query({
      query: (comboId, filter) => `/combo/${comboId}/reviews?${bindParamsFilter(filter)}`,
      providesTags: ["Reviews"],
    }),
    createReview: builder.mutation({
      query: ({ productId, comboId }, initdata) => ({
        url: `/review?${bindParamsFilter({ productId, comboId })}`,
        method: "POST",
        body: initdata,
      }),
      invalidatesTags: ["Reviews"],
    }),
    // ADMIN
    getAllReviewsFiltered: builder.query({
      query: (filter) => `/admin/reviews?${bindParamsFilter(filter)}`,
      providesTags: ["Reviews"],
    }),
    // ADMIN
    deleteReview: builder.mutation({
      query: (reviewId) => ({
        url: `/admin/review?reviewId=${reviewId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Reviews"],
    }),
  }),
});
export const {
  useCreateReviewMutation,
  useDeleteReviewMutation,
  useGetReviewsByComboQuery,
  useGetReviewsByProductQuery,
  useGetReviewsFilteredQuery,
  useGetAllReviewsFilteredQuery,
} = reviewApi;
