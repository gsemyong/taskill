import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { ReactNode, useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  SDKProvider,
  useSDK,
  useBackButton,
  useWebApp,
} from "@tma.js/sdk-react";
import { WebApp } from "@grammyjs/web-app";
import { trpc } from "./lib/trpc";
import ManageTasks from "./routes/manage-tasks";

const router = createBrowserRouter([
  {
    path: "/manage-tasks",
    element: <ManageTasks />,
  },
]);

function App() {
  const backButton = useBackButton();
  const webApp = useWebApp();

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
    webApp.ready();
  }, [webApp]);

  // When App is attached to DOM, lets show back button and
  // add "click" event handler, which should close current application.
  useEffect(() => {
    const listener = () => webApp.close();
    backButton.on("click", listener);
    backButton.show();

    return () => {
      backButton.off("click", listener);
      backButton.hide();
    };
    // We know, that backButton and webApp will never change,
    // but let's follow React rules.
  }, [backButton, webApp]);

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </trpc.Provider>
  );
}

function Loader({ children }: { children: ReactNode }) {
  const { didInit, components, error } = useSDK();

  // There were no calls of SDK's init function. It means, we did not
  // even try to do it.
  if (!didInit) {
    return <div>SDK init function is not yet called.</div>;
  }

  // Error occurred during SDK init.
  if (error !== null) {
    return <div>Something went wrong.</div>;
  }

  // If components is null, it means, SDK is not ready at the
  // moment and currently initializing. Usually, it takes like
  // several milliseconds or something like that, but we should
  // have this check.
  if (components === null) {
    return <div>Warming up SDK.</div>;
  }

  // Safely render application.
  return <>{children}</>;
}

export function AppWrapper() {
  return (
    <SDKProvider
      initOptions={{
        acceptScrollbarStyle: true,
        checkCompat: true,
        debug: true,
      }}
    >
      <Loader>
        <App />
      </Loader>
    </SDKProvider>
  );
}
