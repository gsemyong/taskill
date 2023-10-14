/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from "react-router-dom";
import { route } from "react-router-typesafe-routes/dom";
import { Root } from "./root";
import { TASKER_ROUTES, taskerRoutes } from "./tasker";
import { CUSTOMER_ROUTES, customerRoutes } from "./customer";

export const ROUTES = route(
  "",
  {},
  {
    TASKER: TASKER_ROUTES,
    CUSTOMER: CUSTOMER_ROUTES,
  },
);

export const router = createBrowserRouter([
  {
    element: <Root />,
    children: [taskerRoutes, customerRoutes],
  },
]);
