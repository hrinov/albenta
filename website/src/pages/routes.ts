import { RouteObject } from "react-router-dom";
import LoginPage from "./LoginPage";
import NotFoundPage from "./NotFoundPage";
import SignupPage from "./SignUpPage";

const guestRoutes: RouteObject[] = [
  {
    Component: LoginPage,
    path: "/login",
    index: true,
  },
  {
    Component: SignupPage,
    path: "/signup",
  },
  {
    Component: NotFoundPage,
    path: "*",
  },
];

export default guestRoutes;
