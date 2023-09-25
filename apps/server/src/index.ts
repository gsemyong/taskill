import "dotenv/config";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { appRouter, createContext } from "trpc";
import cors from "cors";

createHTTPServer({
  middleware: cors(),
  router: appRouter,
  createContext,
}).listen(2022);
