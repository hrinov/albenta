import { FC, useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { guestRoutes, accountRoutes } from "./pages/routes";
import { useSelector } from "react-redux";
import { Provider } from "react-redux";
import store from "../redux/store";
import { RootStateInterface } from "../redux/slice";
import { MeResponse } from "../types";
import { useDispatch } from "react-redux";
import { updateUser } from "../redux/slice";
import { requestHandler } from "./utils";

const Router: FC = () => {
  const { user } = useSelector(
    (state: { slice: RootStateInterface }) => state.slice
  );
  const dispatch = useDispatch();
  let routes;
  routes = user ? accountRoutes : guestRoutes;
  const router = createBrowserRouter(routes!);

  const handleUserUpdate = async () => {
    const response: MeResponse = await requestHandler("me", "GET");
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
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    if (accessToken && refreshToken) {
      handleUserUpdate();
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
