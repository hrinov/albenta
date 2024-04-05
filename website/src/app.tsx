import { FC, useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { guestRoutes, accountRoutes } from "./pages/routes";
import { Provider } from "react-redux";
import store from "./redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./redux/slice";
import { Dispatch } from "@reduxjs/toolkit";

const Router: FC = () => {
  const { user } = useSelector(
    (state: { slice: RootStateInterface }) => state.slice
  );
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const dispatch: Dispatch<any> = useDispatch();
  let routes;
  routes = accessToken && refreshToken ? accountRoutes : guestRoutes;
  const router = createBrowserRouter(routes!);

  useEffect(() => {
    if (accessToken && refreshToken && !user) {
      dispatch(fetchUser());
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
