import { FC } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import guestRoutes from "./pages/routes";

const Router = () => {
  let routes;
  routes = guestRoutes;
  const router = createBrowserRouter(routes!);
  return <RouterProvider router={router} />;
};

const App: FC = () => {
  return <Router />;
};

export default App;
