const url = import.meta.env.VITE_URL;

export const requestHandler = async (
  path: string,
  method: string,
  body?: any
) => {
  const makeRequest = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    let responseJSON = await fetch(`${url}/api/${path}`, {
      method: `${method}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    });
    const response = await responseJSON.json();

    if (responseJSON.status == 200) {
      return response;
    } else if ((response.message = "token has expired")) {
      let responseJSON = await fetch(`${url}/api/refreshToken`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken: refreshToken }),
      });
      const response = await responseJSON.json();

      if (response?.success) {
        const { access_token, refresh_token } = response?.data;
        window.localStorage.setItem("accessToken", access_token);
        window.localStorage.setItem("refreshToken", refresh_token);
      }
      return makeRequest();
    } else return;
  };

  return makeRequest();
};
