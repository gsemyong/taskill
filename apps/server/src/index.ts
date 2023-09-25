import "dotenv/config";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { appRouter, createContext } from "trpc";

createHTTPServer({
  router: appRouter,
  createContext,
}).listen(2022);
