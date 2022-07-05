import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { bindParamsFilter } from "src/common/utils";
import { baseQueryWithReauth } from "../auth/auth.query";

// const baseQueryWithRetry = retry(baseQueryWithReauth, { maxRetries: 0 });

export const variantApi = createApi({
  reducerPath: "variantApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Variants"],
  endpoints: (builder) => ({
    // ADMIN
    createVariant: builder.mutation({
      query: (productId, initdata) => ({
        url: `/admin/variant?productId=${productId}`,
        method: "POST",
        body: initdata,
      }),
      invalidatesTags: ["Variants"],
    }),
    // ADMIN
    updateVariant: builder.mutation({
      query: (variantId, initdata) => ({
        url: `/admin/variant?variantId=${variantId}`,
        method: "PUT",
        body: initdata,
      }),
      invalidatesTags: ["Variants"],
    }),
    // ADMIN
    deleteVariants: builder.mutation({
      query: (variantIds) => ({
        url: `/admin/variant`,
        method: "DELETE",
        body: { variantIds },
      }),
      invalidatesTags: ["Variants"],
    }),
  }),
});
export const { useCreateVariantMutation, useDeleteVariantsMutation, useUpdateVariantMutation } =
  variantApi;
