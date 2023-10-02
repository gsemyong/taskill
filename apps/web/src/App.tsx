import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { WebApp } from "@grammyjs/web-app";
import { trpc } from "./lib/trpc";
import CustomerDashobard from "./routes/customer-dashboard";
import AddNewTask from "./routes/add-new-task";
import PostedTasks from "./routes/posted-tasks";
import Proposals from "./routes/proposals";
import OngoingTasks from "./routes/ongoing-tasks";
import InterestedTaskers from "./routes/interested-taskers";
import TaskerProfile from "./routes/tasker-profile";

const router = createBrowserRouter([
  {
    path: "customer",
    children: [
      {
        index: true,
        element: <CustomerDashobard />,
      },
      {
        path: "new",
        element: <AddNewTask />,
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

  useEffect(() => {
    WebApp.ready();
    WebApp.setBackgroundColor("secondary_bg_color");
    WebApp.setHeaderColor("secondary_bg_color");
    document.body.style.backgroundColor = "";
  }, []);

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default App;
