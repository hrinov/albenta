const url = import.meta.env.VITE_URL;
import { createAsyncThunk } from "@reduxjs/toolkit";

export const requestHandler = async (
  path: string,
  method: string,
  body?: any
) => {
  const makeRequest: () => any = async () => {
    const { accessToken, refreshToken } = localStorage;

    const handleRefreshToken = async () => {
      let refreshResponseJSON = await fetch(`${url}/api/refreshToken`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });
      const refreshResponse = await refreshResponseJSON.json();
      if (refreshResponse?.success) {
        const { access_token, refresh_token } = response?.data;

        window.localStorage.setItem("accessToken", access_token);
        window.localStorage.setItem("refreshToken", refresh_token);

        return makeRequest();
      } else {
        handleLogout();
      }
    };

    const handleLogout = () => {
      window.location.href = window.location.origin + "/login";
    };

    let responseJSON = await fetch(`${url}/api/${path}`, {
      method: `${method}`,
      headers: {
        ...(body?.avatar ? {} : { "Content-Type": "application/json" }),
        Authorization: `Bearer ${accessToken}`,
      },
      ...(body && !body?.avatar ? { body: JSON.stringify(body) } : {}),
      ...(body?.avatar ? { body: body?.avatar } : {}),
    });
    const response = await responseJSON.json();

    if (responseJSON.status == 200) return response;

    switch (response?.message) {
      case "token has expired":
        {
          localStorage.clear();
          await handleRefreshToken();
        }
        break;

      default:
        localStorage.clear();
        handleLogout();
    }
  };

  return makeRequest();
};

export const fetchUser = createAsyncThunk("slice/fetchUser", async () => {
  const userData = await requestHandler("me", "GET");
  if (userData?.success) {
    return userData?.data!;
  }
});

export const getDeposits = createAsyncThunk(
  "slice/getDeposits",
  async (depositsLimit: number) => {
    let response = await requestHandler(
      `deposit?limit=${depositsLimit + 1}`,
      "GET"
    );
    if (response?.success) {
      return response.data;
    }
  }
);
