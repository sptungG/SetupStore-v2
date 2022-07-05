import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { bindParamsFilter } from "src/common/utils";
import { baseQueryWithReauth } from "../auth/auth.query";

// const baseQueryWithRetry = retry(baseQueryWithReauth, { maxRetries: 0 });

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    getMyOrders: builder.query({
      query: (filter) => `/orders?${bindParamsFilter(filter)}`,
      providesTags: ["Orders"],
    }),
    createOrder: builder.mutation({
      query: (initdata) => ({
        url: "/order",
        method: "POST",
        body: initdata,
      }),
      invalidatesTags: ["Orders"],
    }),
    createOrderCOD: builder.mutation({
      query: (initdata) => ({
        url: "/order/cod",
        method: "POST",
        body: initdata,
      }),
      invalidatesTags: ["Orders"],
    }),
    // ADMIN
    getAllOrders: builder.query({
      query: (filter) => `/admin/orders?${bindParamsFilter(filter)}`,
      providesTags: ["Orders"],
    }),
    // ADMIN
    getOrderById: builder.query({
      query: (orderId) => `/admin/order/${orderId}}`,
      providesTags: ["Orders"],
    }),
    // ADMIN
    updateOrder: builder.mutation({
      query: (orderId, initdata) => ({
        url: `/admin/order/${orderId}`,
        method: "PUT",
        body: initdata,
      }),
      invalidatesTags: ["Orders"],
    }),
    // ADMIN
    deleteOrder: builder.mutation({
      query: (orderId) => ({
        url: `/admin/order/${orderId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});
export const {
  useCreateOrderCODMutation,
  useCreateOrderMutation,
  useDeleteOrderMutation,
  useGetAllOrdersQuery,
  useGetMyOrdersQuery,
  useGetOrderByIdQuery,
  useUpdateOrderMutation,
} = orderApi;
