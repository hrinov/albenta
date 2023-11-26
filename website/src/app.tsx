import { FC } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { guestRoutes, accountRoutes } from "./pages/routes";
import { useSelector } from "react-redux";
import { Provider } from "react-redux";
import store from "../redux/store";
import { RootStateInterface } from "../redux/slice";

const Router = () => {
  const { accessToken, refreshToken } = useSelector(
    (state: { slice: RootStateInterface }) => state.slice
  );
  const isUserAuthorized = accessToken && refreshToken;

  let routes;
  routes = isUserAuthorized ? accountRoutes : guestRoutes;
  const router = createBrowserRouter(routes!);

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
