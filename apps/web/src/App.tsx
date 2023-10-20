import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";
import { RouterProvider } from "react-router-dom";
import { WebApp } from "@grammyjs/web-app";
import { trpc } from "@/lib/trpc";
import { router } from "@/routes";
import { Theme } from "@radix-ui/themes";

const App = () => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:1337/trpc",
          headers: {
            "init-data": WebApp.initData,
          },
        }),
      ],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Theme
          appearance={WebApp.colorScheme}
          grayColor="mauve"
          accentColor="orange"
          scaling={"110%"}
        >
          <RouterProvider router={router} />
        </Theme>
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default App;
