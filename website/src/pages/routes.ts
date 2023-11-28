import { RouteObject } from "react-router-dom";
import LoginPage from "./LoginPage";
import NotFoundPage from "./NotFoundPage";
import SignupPage from "./SignUpPage";
import AccountMainPage from "./accountPages/mainPage";
import Redirect from "./redirect";

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
    Component: Redirect,
    path: "/",
  },
  {
    Component: NotFoundPage,
    path: "*",
  },
];

const accountRoutes: RouteObject[] = [
  {
    Component: AccountMainPage,
    path: "/account",
  },
  {
    Component: Redirect,
    path: "/",
  },
  {
    Component: NotFoundPage,
    path: "*",
  },
];

export { guestRoutes, accountRoutes };
