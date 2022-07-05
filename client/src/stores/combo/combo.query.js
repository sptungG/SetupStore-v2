import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { bindParamsFilter } from "src/common/utils";
import { baseQueryWithReauth } from "../auth/auth.query";

// const baseQueryWithRetry = retry(baseQueryWithReauth, { maxRetries: 0 });

export const comboApi = createApi({
  reducerPath: "comboApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Combos"],
  endpoints: (builder) => ({
    getCombosFiltered: builder.query({
      query: (filter) => `/combos?${bindParamsFilter(filter)}`,
      providesTags: ["Combos"],
    }),
    getComboById: builder.query({
      query: (comboId) => `/combo/${comboId}`,
      providesTags: ["Combos"],
    }),
    requestCombo: builder.mutation({
      query: (initdata) => ({
        url: "/combo",
        method: "POST",
        body: initdata,
      }),
      invalidatesTags: ["Combos"],
    }),
    commentCombo: builder.mutation({
      query: (comboId, initdata) => ({
        url: `/combo/${comboId}/comment`,
        method: "POST",
        body: initdata,
      }),
      invalidatesTags: ["Combos"],
    }),
    comboViewInc: builder.mutation({
      query: (comboId) => ({
        url: `/combo/${comboId}/view`,
        method: "PUT",
      }),
      invalidatesTags: ["Combos"],
    }),
    // ADMIN
    createCombo: builder.mutation({
      query: (initdata) => ({
        url: `/admin/combo`,
        method: "POST",
        body: initdata,
      }),
      invalidatesTags: ["Combos"],
    }),
    // ADMIN
    updateCombo: builder.mutation({
      query: (comboId, initdata) => ({
        url: `/admin/combo/${comboId}`,
        method: "PUT",
        body: initdata,
      }),
      invalidatesTags: ["Combos"],
    }),
    // ADMIN
    deleteCombo: builder.mutation({
      query: (comboId) => ({
        url: `/admin/combo/${comboId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Combos"],
    }),
  }),
});
export const {
  useGetCombosFilteredQuery,
  useCommentComboMutation,
  useComboViewIncMutation,
  useCreateComboMutation,
  useDeleteComboMutation,
  useGetComboByIdQuery,
  useRequestComboMutation,
  useUpdateComboMutation,
} = comboApi;
