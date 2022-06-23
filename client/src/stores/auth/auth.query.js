import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";
import { signOut } from "firebase/auth";
import { auth } from "src/common/firebase-config";
import { setAuthtokenCredential, setRefreshToken, setUserCredential } from "./auth.reducer";

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

const mutex = new Mutex();

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshToken = api.getState().auth.refreshToken;
        const refreshResult = await fetchBaseQuery({
          baseUrl: `https://securetoken.googleapis.com/v1`,
        })(
          {
            url: `/token?key=${process.env.REACT_APP_FIREBASE_API_KEY}`,
            method: "POST",
            body: {
              grant_type: "refresh_token",
              refresh_token: refreshToken,
            },
            headers: {
              "Content-Type": "application/json",
            },
          },
          {},
          { maxRetries: 0 }
        );
        if (refreshResult.data) {
          // store the new token
          api.dispatch(setRefreshToken(refreshResult.data.refresh_token));
          api.dispatch(setAuthtokenCredential(refreshResult.data.id_token));

          // retry the initial query
          result = await baseQuery(
            { ...args, headers: { authtoken: refreshResult.data.id_token } },
            api,
            extraOptions
          );
        } else {
          await signOut(auth);
          api.dispatch(setUserCredential(null));
          api.dispatch(setAuthtokenCredential(null));
          api.dispatch(setRefreshToken(null));
          window.history.replaceState({}, "", "/");
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
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
