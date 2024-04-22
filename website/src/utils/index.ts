const url = import.meta.env.VITE_SERVER_URL;

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
        const { access_token, refresh_token } = refreshResponse?.data;

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

    switch (response?.message) {
      case "token has expired":
        {
          localStorage.clear();
          await handleRefreshToken();
        }
        break;
      case "wrong token":
        {
          localStorage.clear();
          handleLogout();
        }
        break;
      default:
        return response;
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

export const formatDate = (inputDate: string) => {
  const date = new Date(inputDate);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedDay = day < 10 ? `0${day}` : `${day}`;
  const formattedMonth = month < 10 ? `0${month}` : `${month}`;
  const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

  return `${formattedDay}.${formattedMonth}.${year} ${formattedHours}:${formattedMinutes}`;
};

export const getDataOptions = () => {
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from(
    { length: currentYear - 2023 + 1 },
    (_, i) => ({
      value: String(currentYear - i),
      label: String(currentYear - i),
      key: i,
    })
  );
  const currentMonth = new Date().getMonth();
  const monthOptions = Array.from({ length: 12 }, (_, index) => {
    return {
      value: new Date(currentYear, index).toLocaleString("default", {
        month: "long",
      }),
      label: new Date(currentYear, index).toLocaleString("default", {
        month: "long",
      }),
      key: index,
    };
  });
  const currentMonthName = monthOptions?.find(
    (option) => +option.key === currentMonth
  )!.label;

  return {
    currentYear,
    yearOptions,
    currentMonth,
    monthOptions,
    currentMonthName,
  };
};

export const getDaysInMonth = (month: number) =>
  [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
