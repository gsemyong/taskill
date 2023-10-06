import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { WebApp } from "@grammyjs/web-app";
import { trpc } from "./lib/trpc";
import CustomerDashobard from "./routes/customer/customer-dashboard";
import PostNewTask from "./routes/customer/post-new-task";
import PostedTasks from "./routes/customer/posted-tasks";
import Proposals from "./routes/customer/proposals";
import CustomerOngoingTasks from "./routes/customer/ongoing-tasks";
import InterestedTaskers from "./routes/customer/interested-taskers";
import TaskerProfile from "./routes/customer/tasker-profile";
import Root from "./routes/root";
import TaskerDashboard from "./routes/tasker/tasker-dashboard";
import GettingStarted from "./routes/tasker/getting-started";
import DiscoverTasks from "./routes/tasker/discover-tasks";
import InterestingTasks from "./routes/tasker/interesting-tasks";
import TaskerOngoingTasks from "./routes/tasker/ongoing-tasks";
import MyProfile from "./routes/tasker/my-profile";

const router = createBrowserRouter([
  {
    path: "tasker",
    element: <Root />,
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
    element: <Root />,
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
