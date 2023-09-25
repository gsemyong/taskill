import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { appRouter } from "trpc";

createHTTPServer({
  router: appRouter,
  createContext() {
    console.log("context 3");
    return {};
  },
}).listen(2022);
