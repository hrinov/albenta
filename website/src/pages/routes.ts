import { RouteObject } from "react-router-dom";
import LoginPage from "./LoginPage";
import NotFoundPage from "./NotFoundPage";
import SignupPage from "./SignUpPage";
import AccountMainPage from "./accountPages/mainPage";

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

const accountRoutes: RouteObject[] = [
  {
    Component: AccountMainPage,
    path: "/account",
  },
  {
    Component: NotFoundPage,
    path: "*",
  },
];

export { guestRoutes, accountRoutes };
