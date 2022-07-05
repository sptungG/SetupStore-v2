import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { bindParamsFilter } from "src/common/utils";
import { baseQueryWithReauth } from "../auth/auth.query";

// const baseQueryWithRetry = retry(baseQueryWithReauth, { maxRetries: 0 });

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Categories", "Category"],
  endpoints: (builder) => ({
    getAllCategoriesFiltered: builder.query({
      query: (filter) => `/categories?${bindParamsFilter(filter)}`,
      providesTags: ["Categories", "Category"],
    }),
    getCategory: builder.query({
      query: (categoryId) => `/category/${categoryId}`,
      providesTags: ["Category"],
    }),
    // ADMIN
    createCategory: builder.mutation({
      query: (initdata) => ({
        url: "/admin/category",
        method: "POST",
        body: initdata,
      }),
      invalidatesTags: ["Categories"],
    }),
    // ADMIN
    updateCategory: builder.mutation({
      query: (categoryId, initdata) => ({
        url: `/admin/category/${categoryId}`,
        method: "PUT",
        body: initdata,
      }),
      invalidatesTags: ["Categories"],
    }),
    // ADMIN
    deleteCategory: builder.mutation({
      query: (categoryId) => ({
        url: `/admin/category/${categoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories"],
    }),
  }),
});
export const {
  useGetAllCategoriesFilteredQuery,
  useCreateCategoryMutation,
  useGetCategoryQuery,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} = categoryApi;
