const url = import.meta.env.VITE_URL;

export const requestHandler = async (
  path: string,
  method: string,
  body: any
) => {
  let responseJSON = await fetch(`${url}/api/${path}`, {
    method: `${method}`,
    headers: {
      "Content-Type": "application/json",
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const response = await responseJSON.json();
  if (responseJSON.status == 200) {
    return response;
  } else if ((response.message = "token has expired")) {
    console.log("token has expired");
  } else return;
};
