import { initTRPC } from "@trpc/server";
import { procedure, router } from "./trpc";

export const t = initTRPC.create();

export const appRouter = router({
  hello: procedure.query(() => {
    return {
      text: "Hello, world!",
    };
  }),
});

export type AppRouter = typeof appRouter;
