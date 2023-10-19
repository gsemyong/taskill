import { type RouteObject } from "react-router-dom";
import { route, string } from "react-router-typesafe-routes/dom";
import { Root } from "./root";
import { Menu } from "./menu";
import { Onboarding } from "./onboarding";
import { Discover } from "./discover";
import { OngoingTasks } from "./ongoing-tasks";
import { OngoingTask } from "./ongoing-task";
import { Profile } from "./profile";
import { EditProfile } from "./edit-profile";
import { NewProposal } from "./new-proposal";
import { Proposal } from "./proposal";
import { Proposals } from "./proposals";
import { FinishedTasks } from "./finished-tasks";

export const TASKER_ROUTES = route(
  "tasker",
  {},
  {
    MENU: route(""),
    ONBOARDING: route("onboarding"),
    DISCOVER: route("discover"),
    ONGOING_TASKS: route("ongoing"),
    ONGOING_TASK: route("ongoing/:taskId", {
      params: {
        taskId: string().defined(),
      },
    }),
    PROFILE: route("profile"),
    EDIT_PROFILE: route("editProfile"),
    NEW_PROPOSAL: route("newProposal/:taskId", {
      params: {
        taskId: string().defined(),
      },
    }),
    PROPOSALS: route("proposals"),
    PROPOSAL: route("proposal/:proposalId", {
      params: {
        proposalId: string().defined(),
      },
    }),
    FINISHED_TASKS: route("finished"),
  },
);

export const taskerRoutes: RouteObject = {
  path: TASKER_ROUTES.path,
  element: <Root />,
  children: [
    {
      index: true,
      element: <Menu />,
    },
    {
      path: TASKER_ROUTES.ONBOARDING.path,
      element: <Onboarding />,
    },
    {
      path: TASKER_ROUTES.DISCOVER.path,
      element: <Discover />,
    },
    {
      path: TASKER_ROUTES.ONGOING_TASKS.path,
      element: <OngoingTasks />,
    },
    {
      path: TASKER_ROUTES.ONGOING_TASK.path,
      element: <OngoingTask />,
    },
    {
      path: TASKER_ROUTES.PROFILE.path,
      element: <Profile />,
    },
    {
      path: TASKER_ROUTES.EDIT_PROFILE.path,
      element: <EditProfile />,
    },
    {
      path: TASKER_ROUTES.NEW_PROPOSAL.path,
      element: <NewProposal />,
    },
    {
      path: TASKER_ROUTES.PROPOSAL.path,
      element: <Proposal />,
    },
    {
      path: TASKER_ROUTES.PROPOSALS.path,
      element: <Proposals />,
    },
    {
      path: TASKER_ROUTES.FINISHED_TASKS.path,
      element: <FinishedTasks />,
    },
  ],
};
