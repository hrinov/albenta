import { FC, useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { guestRoutes, accountRoutes } from "./pages/routes";
import { useSelector } from "react-redux";
import { Provider } from "react-redux";
import store from "../redux/store";
import { RootStateInterface } from "../redux/slice";
import { LoginSignupResponse } from "../types";
import { useDispatch } from "react-redux";
import { updateUser } from "../redux/slice";
const url = import.meta.env.VITE_URL;

const Router: FC = () => {
  const { user } = useSelector(
    (state: { slice: RootStateInterface }) => state.slice
  );
  const dispatch = useDispatch();
  let routes;
  routes = user ? accountRoutes : guestRoutes;
  const router = createBrowserRouter(routes!);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    if (accessToken && refreshToken) {
      fetch(`${url}/api/me`, {
        method: "Get",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          if (response?.success) {
            const { email, name, balance } = response?.data;
            dispatch(
              updateUser({
                email: email,
                name: name,
                balance: balance,
              })
            );
          }
        });
    }
  }, []);

  return <RouterProvider router={router} />;
};

const App: FC = () => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

export default App;
