const url = import.meta.env.VITE_URL;

export const requestHandler = async (
  path: string,
  method: string,
  body?: any
) => {
  const makeRequest: () => any = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

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
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        let refreshResponseJSON = await fetch(`${url}/api/refreshToken`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken: refreshToken }),
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
        break;

      case "wrong token":
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        handleLogout();
        break;

      default:
        return response;
    }
  };

  return makeRequest();
};
