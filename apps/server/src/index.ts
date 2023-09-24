import { initTRPC } from "@trpc/server";

export const t = initTRPC.create();

export const appRouter = t.router({});

export type AppRouter = typeof appRouter;

import { createHTTPServer } from "@trpc/server/adapters/standalone";

createHTTPServer({
  router: appRouter,
  createContext() {
    console.log("context 3");
    return {};
  },
}).listen(2022);
