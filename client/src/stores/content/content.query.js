import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { bindParamsFilter } from "src/common/utils";
import { baseQueryWithReauth } from "../auth/auth.query";

// const baseQueryWithRetry = retry(baseQueryWithReauth, { maxRetries: 0 });

export const contentApi = createApi({
  reducerPath: "contentApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Contents"],
  endpoints: (builder) => ({
    getAllContentsFiltered: builder.query({
      query: (filter) => `/contents?${bindParamsFilter(filter)}`,
      providesTags: ["Contents"],
    }),
    getContentByModelId: builder.query({
      query: (modelId) => `/content?modelId=${modelId}`,
      providesTags: ["Contents"],
    }),
    // ADMIN
    createContent: builder.mutation({
      query: (initdata) => ({
        url: "/admin/content",
        method: "POST",
        body: initdata,
      }),
      invalidatesTags: ["Contents"],
    }),
    // ADMIN
    updateContentById: builder.mutation({
      query: (contentId, initdata) => ({
        url: `/admin/content?contentId=${contentId}`,
        method: "PUT",
        body: initdata,
      }),
      invalidatesTags: ["Contents"],
    }),
    // ADMIN
    removeContent: builder.mutation({
      query: (contentId) => ({
        url: `/admin/content?contentId=${contentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Contents"],
    }),
  }),
});
export const {
  useCreateContentMutation,
  useGetAllContentsFilteredQuery,
  useGetContentByModelIdQuery,
  useRemoveContentMutation,
  useUpdateContentByIdMutation,
} = contentApi;
