import { type RouteObject } from "react-router-dom";
import { route, number, string } from "react-router-typesafe-routes/dom";
import { Menu } from "./menu";
import { OngoingTasks } from "./ongoing-tasks";
import { OngoingTask } from "./ongoing-task";
import { Proposal } from "./proposal";
import { FinishedTasks } from "./finished-tasks";
import { PostedTasks } from "./posted-tasks";
import { PostedTask } from "./posted-task";
import { NewTask } from "./new-task";

export const CUSTOMER_ROUTES = route(
  "customer",
  {},
  {
    MENU: route(""),
    POSTED_TASKS: route("posted"),
    POSTED_TASK: route("posted/:taskId", {
      params: {
        taskId: string().defined(),
      },
    }),
    NEW_TASK: route("new"),
    ONGOING_TASKS: route("ongoing"),
    ONGOING_TASK: route("ongoing/:taskId", {
      params: {
        taskId: string().defined(),
      },
    }),
    PROPOSAL: route("proposal/:proposalId", {
      params: {
        proposalId: string().defined(),
      },
    }),
    FINISHED_TASKS: route("finished"),
    TASKER_PROFILE: route("tasker/:taskerId", {
      params: {
        taskerId: number().defined(),
      },
    }),
  },
);

export const customerRoutes: RouteObject = {
  path: CUSTOMER_ROUTES.path,
  children: [
    {
      index: true,
      element: <Menu />,
    },
    {
      path: CUSTOMER_ROUTES.POSTED_TASKS.path,
      element: <PostedTasks />,
    },
    {
      path: CUSTOMER_ROUTES.POSTED_TASK.path,
      element: <PostedTask />,
    },
    {
      path: CUSTOMER_ROUTES.NEW_TASK.path,
      element: <NewTask />,
    },
    {
      path: CUSTOMER_ROUTES.POSTED_TASK.path,
      element: <OngoingTask />,
    },
    {
      path: CUSTOMER_ROUTES.ONGOING_TASKS.path,
      element: <OngoingTasks />,
    },
    {
      path: CUSTOMER_ROUTES.ONGOING_TASK.path,
      element: <OngoingTask />,
    },
    {
      path: CUSTOMER_ROUTES.PROPOSAL.path,
      element: <Proposal />,
    },
    {
      path: CUSTOMER_ROUTES.FINISHED_TASKS.path,
      element: <FinishedTasks />,
    },
  ],
};
