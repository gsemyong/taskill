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
  Proposals,
  TaskerProfile,
  CustomerRoot,
} from "./routes/customer";
import {
  DiscoverTasks,
  GettingStarted,
  InterestingTasks,
  MyProfile,
  TaskerDashboard,
  TaskerOngoingTasks,
  TaskerRoot,
} from "./routes/tasker";

const router = createBrowserRouter([
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
        path: "interesting",
        element: <InterestingTasks />,
      },
      {
        path: "ongoing",
        element: <TaskerOngoingTasks />,
      },
      {
        path: "profile",
        element: <MyProfile />,
      },
    ],
  },
  {
    path: "customer",
    element: <CustomerRoot />,
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
        path: "proposals",
        element: <Proposals />,
      },
      {
        path: "ongoing",
        element: <CustomerOngoingTasks />,
      },
      {
        path: "interested/:taskId",
        element: <InterestedTaskers />,
      },
      {
        path: "tasker/:taskerId",
        element: <TaskerProfile />,
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
          url: "https://6336-62-168-118-250.ngrok-free.app/trpc",
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
