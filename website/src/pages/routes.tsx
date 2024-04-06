import Account from "./Account";
import Redirect from "./redirect";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import NotFoundPage from "./NotFoundPage";
import { RouteObject } from "react-router-dom";

const guestRoutes: RouteObject[] = [
  {
    Component: LoginPage,
    path: "/login",
    index: true,
  },
  {
    Component: SignUpPage,
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
    index: true,
  },
  {
    element: <Account type={"deposits"} />,
    path: "/account/deposits/your-deposits",
    index: true,
  },
  {
    element: <Account type={"activity-log"} />,
    path: "/account/history/activity-log",
    index: true,
  },
  {
    element: <Account type={"income"} />,
    path: "/account/history/income",
    index: true,
  },
  {
    element: <Account type={"profile"} />,
    path: "/account/profile",
    index: true,
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
