const url = import.meta.env.VITE_URL;

export const requestHandler = async (
  path: string,
  method: string,
  body?: any
) => {
  const makeRequest: () => any = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

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

    if (responseJSON.status == 200) {
      return response;
    } else {
      switch (response?.message) {
        case "token has expired":
          if (response?.success) {
            const { access_token, refresh_token } = response?.data;
            window.localStorage.setItem("accessToken", access_token);
            window.localStorage.setItem("refreshToken", refresh_token);
            return makeRequest();
          }
          break;

        case "wrong token":
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          break;

        default:
          return;
      }
    }
  };

  return makeRequest();
};
