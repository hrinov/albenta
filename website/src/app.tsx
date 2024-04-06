import store from "./redux/store";
import { fetchUser } from "./utils";
import { FC, useEffect } from "react";
import { Provider } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { guestRoutes, accountRoutes } from "./pages/routes";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const Router: FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const { user } = useSelector(
    (state: { slice: RootStateInterface }) => state.slice
  );

  const router = createBrowserRouter(
    localStorage.getItem("refreshToken") ? accountRoutes : guestRoutes
  );

  useEffect(() => {
    localStorage.getItem("refreshToken") && !user && dispatch(fetchUser());
  }, [user]);

  return <RouterProvider router={router} />;
};

const App: FC = () => <Provider store={store} children={<Router />} />;

export default App;
