import { initTRPC } from "@trpc/server";
import { router } from "./trpc";

export const t = initTRPC.create();

export const appRouter = router({});

export type AppRouter = typeof appRouter;

export { createContext } from "./context";
