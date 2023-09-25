import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useEffect, useState } from "react";
import { trpc } from "./lib/trpc";
import { WebApp } from "@grammyjs/web-app";
import Root from "./root";

export default function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "https://744e-217-73-28-71.ngrok-free.app/trpc",

          // You can pass any HTTP headers you wish here
          async headers() {
            return {
              initData: WebApp.initData,
            };
          },
        }),
      ],
    })
  );

  useEffect(() => {
    WebApp.ready();
  }, []);

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Root />
      </QueryClientProvider>
    </trpc.Provider>
  );
}
