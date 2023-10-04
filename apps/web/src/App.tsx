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
import OngoingTasks from "./routes/customer/ongoing-tasks";
import InterestedTaskers from "./routes/customer/interested-taskers";
import TaskerProfile from "./routes/customer/tasker-profile";
import Root from "./routes/customer/root";

const router = createBrowserRouter([
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
        element: <OngoingTasks />,
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
          url: "https://069f-217-73-28-71.ngrok-free.app/trpc",
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
