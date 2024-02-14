import { RouteObject } from "react-router-dom";
import LoginPage from "./LoginPage";
import NotFoundPage from "./NotFoundPage";
import SignupPage from "./SignUpPage";
import Account from "./AccountPages";
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
    element: <Account type={"plans"} />,
    path: "/account/deposits/plans",
  },
  {
    element: <Account type={"deposits"} />,
    path: "/account/deposits/your",
  },
  {
    element: <Account type={"activity-log"} />,
    path: "/account/history/activity-log",
  },
  {
    element: <Account type={"profile"} />,
    path: "/account/profile",
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
