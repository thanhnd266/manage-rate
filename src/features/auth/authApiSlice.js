import Cookies from "js-cookie";
import { apiSlice } from "../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (payload) => {
        return {
          url: `${process.env.REACT_APP_API_URL_A}/auth/token`,
          method: "POST",
          body: JSON.stringify(payload),
        };
      },
    }),
    logout: builder.mutation({
      query: (payload) => ({
        url: `${process.env.REACT_APP_API_URL_A}/auth/revoke`,
        method: "POST",
        body: JSON.stringify(payload),
      }),
    }),
    refresh: builder.mutation({
      query: (payload) => ({
        url: `${process.env.REACT_APP_API_URL_A}/auth/token`,
        method: "POST",
        body: JSON.stringify(payload)
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { access_token, refresh_token } = data;
          // dispatch(setCredentials({ access_token }));
          Cookies.set("accessToken", access_token)
          Cookies.set("refreshToken", refresh_token)
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useRefreshMutation } = authApiSlice;
