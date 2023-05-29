import React from "react";
import Root from "../pages/Root";
import pageRoute from "./pageRoute";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";

const Dashboard = React.lazy(() => import("../pages/Dashboard"));
const Analytis = React.lazy(() => import("../pages/Analytis"));
const LoginPage = React.lazy(() => import("../pages/Login"));

const router = [
  {
    path: pageRoute.dashboardPage,
    element: <Root />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: pageRoute.analytisPage, element: <Analytis /> },
    ],
  },
  {
    path: pageRoute.loginPage,
    element: <LoginPage />,
    children: [
      {
        index: true,
        element: <LoginForm />,
      },
      {
        path: "signup-form",
        element: <SignUpForm />,
      },
    ],
  },
];

export default router;
