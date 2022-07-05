import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { bindParamsFilter } from "src/common/utils";
import { baseQueryWithReauth } from "../auth/auth.query";

// const baseQueryWithRetry = retry(baseQueryWithReauth, { maxRetries: 0 });

export const addressApi = createApi({
  reducerPath: "addressApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["UserAddress"],
  endpoints: (builder) => ({
    getMyAddressList: builder.query({
      query: () => `/user/address_list`,
      providesTags: ["UserAddress"],
    }),
    addToMyAddressList: builder.mutation({
      query: (initdata) => ({
        url: `/user/address`,
        method: "POST",
        body: initdata,
      }),
      invalidatesTags: ["UserAddress"],
    }),
    updateMyAddress: builder.mutation({
      query: (addressId, initdata) => ({
        url: `/user/address?addressId=${addressId}`,
        method: "PUT",
        body: initdata,
      }),
      invalidatesTags: ["UserAddress"],
    }),
    removeAddressById: builder.mutation({
      query: (addressId, initdata) => ({
        url: `/user/address?addressId=${addressId}`,
        method: "DELETE",
        body: initdata,
      }),
      invalidatesTags: ["UserAddress"],
    }),
  }),
});
export const {
  useAddToMyAddressListMutation,
  useGetMyAddressListQuery,
  useRemoveAddressByIdMutation,
  useUpdateMyAddressMutation,
} = addressApi;
