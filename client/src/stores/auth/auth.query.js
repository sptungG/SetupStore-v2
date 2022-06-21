import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API,
  prepareHeaders: (headers, { getState }) => {
    //  By default, if we have a token in the store, let's use that for authenticated requests
    const authtoken = getState().auth.authtoken;
    if (authtoken) {
      headers.set("authtoken", authtoken);
    }
    return headers;
  },
});
// const baseQueryWithReauth = async (args, api, extraOptions) => {
//   let result = await baseQuery(args, api, extraOptions)
//   if (result.error && result.error.status === 401) {
//     // try to get a new token
//     const refreshResult = await baseQuery(`https://securetoken.googleapis.com/v1/token?key=`, api, extraOptions)
//     if (refreshResult.data) {
//       // store the new token
//       api.dispatch(tokenReceived(refreshResult.data))
//       // retry the initial query
//       result = await baseQuery(args, api, extraOptions)
//     } else {
//       api.dispatch(loggedOut())
//     }
//   }
//   return result
// }

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 0 });

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithRetry,
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    createOrUpdateUser: builder.mutation({
      query: (authtoken) => ({
        url: "/create-or-update-user",
        method: "POST",
        headers: {
          authtoken,
        },
      }),
      invalidatesTags: ["Auth"],
    }),
    currentUser: builder.mutation({
      query: (authtoken) => ({
        url: "/current-user",
        method: "POST",
        headers: {
          authtoken,
        },
      }),
      invalidatesTags: ["Auth"],
      
    }),
    // updateTask: builder.mutation({
    //   query: ({ id, ...rest }) => ({
    //     url: `/tasks/${id}`,
    //     method: "PUT",
    //     body: rest,
    //   }),
    //   invalidatesTags: ["Auth"],
    // }),
    // deleteTask: builder.mutation({
    //   query: (id) => ({
    //     url: `/tasks/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["Auth"],
    // }),
  }),
});
export const { useCreateOrUpdateUserMutation, useCurrentUserMutation } = authApi;
