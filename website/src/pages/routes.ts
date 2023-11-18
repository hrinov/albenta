import { RouteObject } from "react-router-dom";
import LoginPage from "./LoginPage";
import NotFoundPage from "./NotFoundPage";

const guestRoutes: RouteObject[] = [
  {
    Component: LoginPage,
    path: "/login",
    index: true,
  },
  {
    Component: NotFoundPage,
    path: "*",
  },
];

export default guestRoutes;
