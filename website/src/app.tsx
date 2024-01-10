import { FC, useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { guestRoutes, accountRoutes } from "./pages/routes";
import { Provider } from "react-redux";
import store from "../redux/store";
import { MeResponse } from "../types";
import { useDispatch } from "react-redux";
import { RootStateInterface, updateUser } from "../redux/slice";
import { requestHandler } from "./utils";
import { useSelector } from "react-redux";

const Router: FC = () => {
  const { user } = useSelector(
    (state: { slice: RootStateInterface }) => state.slice
  );
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const dispatch = useDispatch();
  let routes;
  routes = accessToken && refreshToken ? accountRoutes : guestRoutes;
  const router = createBrowserRouter(routes!);

  const handleUserUpdate = async () => {
    const response: MeResponse = await requestHandler("me", "GET");
    if (response?.success) {
      const { avatar, id, email, name, balance } = response?.data;
      dispatch(
        updateUser({
          id,
          email,
          name,
          balance,
          avatar,
        })
      );
    }
  };

  useEffect(() => {
    if (accessToken && refreshToken && !user) {
      handleUserUpdate();
    }
  }, [user, accessToken, refreshToken]);

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
