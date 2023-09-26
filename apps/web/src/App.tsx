import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useEffect, useState } from "react";
import { WebApp } from "@grammyjs/web-app";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { trpc } from "./lib/trpc";
import ManageTasks from "./routes/manage-tasks";

const router = createBrowserRouter([
  {
    path: "/manage-tasks",
    element: <ManageTasks />,
  },
]);

export default function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "https://e4d1-217-73-28-71.ngrok-free.app/trpc",
          headers: {
            "ngrok-skip-browser-warning": "true",
            "init-data": WebApp.initData,
          },
        }),
      ],
    })
  );
  const [ready, setReady] = useState(false);

  useEffect(() => {
    WebApp.ready();
    setReady(true);
  }, []);

  if (!ready) {
    return null;
  }

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </trpc.Provider>
  );
}
