import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { WebApp } from "@grammyjs/web-app";
import { trpc } from "./lib/trpc";
import {
  CustomerDashobard,
  CustomerOngoingTasks,
  InterestedTaskers,
  PostNewTask,
  PostedTasks,
  Task,
  TaskerProfile,
  CustomerProposal,
  CustomerOngoingTask,
} from "./routes/customer";
import {
  DiscoverTasks,
  EditProfile,
  GettingStarted,
  MakeProposal,
  MyProfile,
  TaskerDashboard,
  TaskerOngoingTask,
  TaskerOngoingTasks,
  TaskerProposal,
  TaskerProposals,
  TaskerRoot,
} from "./routes/tasker";
import { Root } from "./routes/root";

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        path: "tasker",
        element: <TaskerRoot />,
        children: [
          {
            index: true,
            element: <TaskerDashboard />,
          },
          {
            path: "getting-started",
            element: <GettingStarted />,
          },
          {
            path: "discover",
            element: <DiscoverTasks />,
          },
          {
            path: "ongoing",
            element: <TaskerOngoingTasks />,
          },
          {
            path: "ongoing/:taskId",
            element: <TaskerOngoingTask />,
          },
          {
            path: "profile",
            element: <MyProfile />,
          },
          {
            path: "edit-profile",
            element: <EditProfile />,
          },
          {
            path: "make-proposal/:taskId",
            element: <MakeProposal />,
          },
          {
            path: "proposal/:proposalId",
            element: <TaskerProposal />,
          },
          {
            path: "proposals",
            element: <TaskerProposals />,
          },
        ],
      },
      {
        path: "customer",
        children: [
          {
            index: true,
            element: <CustomerDashobard />,
          },
          {
            path: "new",
            element: <PostNewTask />,
          },
          {
            path: "posted",
            element: <PostedTasks />,
          },
          {
            path: "ongoing",
            element: <CustomerOngoingTasks />,
          },
          {
            path: "ongoing/:taskId",
            element: <CustomerOngoingTask />,
          },
          {
            path: "interested/:taskId",
            element: <InterestedTaskers />,
          },
          {
            path: "tasker/:taskerId",
            element: <TaskerProfile />,
          },
          {
            path: "post/:taskId",
            element: <Task />,
          },
          {
            path: "proposal/:proposalId",
            element: <CustomerProposal />,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "https://d251-62-65-174-190.ngrok-free.app/trpc",
          headers: {
            "ngrok-skip-browser-warning": "true",
            "init-data": WebApp.initData,
          },
        }),
      ],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default App;
