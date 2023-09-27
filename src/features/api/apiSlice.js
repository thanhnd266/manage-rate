import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { NotiModal } from "../../components/UIHandler/NotiModal";

const baseQuery = fetchBaseQuery({
  baseUrl: "/",
  credentials: "same-origin",
  prepareHeaders: (headers, { getState }) => {
    // const token = getState().auth.token.accessToken;
    const formRequest = localStorage.getItem("formRequest");
    const token = Cookies.get("accessToken");

    //check set headers when request not form data
    if (!formRequest) {
      headers.set("Content-Type", "application/json");
    } else {
      localStorage.removeItem("formRequest");
    }

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  const currentRefreshToken = Cookies.get("refreshToken");
  let result = await baseQuery(args, api, extraOptions);

  if (result.code === "114" || result?.error?.status === 401) {
    // send refresh token to get new access token
    const refreshResult = await baseQuery(
      {
        url: `${process.env.REACT_APP_API_URL_A}/auth/token`,
        // url: "http://localhost:2626/auth/api/relogin",
        method: "POST",
        body: JSON.stringify({
          type: "REFRESH_TOKEN",
          refreshToken: currentRefreshToken,
          // refresh_token: currentRefreshToken,
        }),
      },
      api,
      extraOptions
    );

    if (
      refreshResult.data?.code === "0" ||
      refreshResult?.data?.status_code === 200
    ) {
      // store the new token
      // api.dispatch(setCredentials({ ...refreshResult.data.data }));
      Cookies.set("accessToken", refreshResult.data.data.access_token);
      Cookies.set("refreshToken", refreshResult.data.data.refresh_token);

      // retry original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      // api.dispatch(checkRefreshExpired(true));
      refreshResult.error.data.message = "Your login has expired.";
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      NotiModal(
        "info",
        "Thông báo",
        "Bạn đã hết phiên đăng nhập, vui lòng đăng nhập lại.",
        () => (window.location.href = "/auth/signin")
      );
      return refreshResult;
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User"],
  endpoints: (builder) => ({}),
});
