import { initTRPC } from "@trpc/server";
import { procedure, router } from "./trpc";
import superjson from "superjson";

export const t = initTRPC.create({
  transformer: superjson,
});

export const appRouter = router({
  hello: procedure.query(({ ctx }) => {
    return {
      text: `hello ${ctx.user?.first_name ?? "world"}`,
    };
  }),
});

export type AppRouter = typeof appRouter;
