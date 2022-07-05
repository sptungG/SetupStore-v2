import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { bindParamsFilter } from "src/common/utils";
import { baseQueryWithReauth } from "../auth/auth.query";

// const baseQueryWithRetry = retry(baseQueryWithReauth, { maxRetries: 0 });

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Users", "User", "UserAddressList", "UserAddress"],
  endpoints: (builder) => ({
    updateMyInfo: builder.mutation({
      query: (initdata) => ({
        url: `/user`,
        method: "PUT",
        body: initdata,
      }),
      invalidatesTags: ["User"],
    }),
    // ADMIN
    getFilteredUsers: builder.query({
      query: (filter) => `/admin/users?${bindParamsFilter(filter)}`,
      providesTags: ["Users"],
    }),
    // ADMIN
    getUserById: builder.query({
      query: (userId) => `/admin/user/${userId})}`,
      providesTags: ["User"],
    }),
    // ADMIN
    updateUser: builder.mutation({
      query: (userId, initdata) => ({
        url: `/admin/user/${userId})}`,
        method: "PUT",
        body: initdata,
      }),
      invalidatesTags: ["User"],
    }),
    // ADMIN
    removeUser: builder.mutation({
      query: (userId) => ({
        url: `/admin/user/${userId})}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});
export const {
  useUpdateMyInfoMutation,
  useGetFilteredUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useRemoveUserMutation,
} = userApi;
