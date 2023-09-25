import { initTRPC } from "@trpc/server";
import { procedure, router } from "./trpc";

export const t = initTRPC.create();

export const appRouter = router({
  hello: procedure.query(({ ctx }) => {
    console.log(ctx.user);
  }),
});

export type AppRouter = typeof appRouter;

export { createContext } from "./context";
