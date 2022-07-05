import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { bindParamsFilter } from "src/common/utils";
import { baseQueryWithReauth } from "../auth/auth.query";

// const baseQueryWithRetry = retry(baseQueryWithReauth, { maxRetries: 0 });

export const imageApi = createApi({
  reducerPath: "imageApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Image"],
  endpoints: (builder) => ({
    uploadImage: builder.mutation({
      query: ({ onModel, imageUrl, image }) => ({
        url: `/uploadimages?onModel=${onModel}`,
        method: "POST",
        body: { imageUrl, image },
      }),
      invalidatesTags: ["Image"],
    }),
    removeImage: builder.mutation({
      query: ({ imageId }) => ({
        url: `/removeimage`,
        method: "DELETE",
        body: { imageId },
      }),
      invalidatesTags: ["Image"],
    }),
    uploadAdminImage: builder.mutation({
      query: ({ onModel, imageUrl, image }) => ({
        url: `/admin/uploadimages?onModel=${onModel}`,
        method: "POST",
        body: { imageUrl, image },
      }),
      invalidatesTags: ["Image"],
    }),
    removeAdminImage: builder.mutation({
      query: ({ imageId }) => ({
        url: `/admin/removeimage`,
        method: "DELETE",
        body: { imageId },
      }),
      invalidatesTags: ["Image"],
    }),
  }),
});
export const {
  useUploadImageMutation,
  useRemoveImageMutation,
  useUploadAdminImageMutation,
  useRemoveAdminImageMutation,
} = imageApi;
