import { initTRPC } from "@trpc/server";
import { protectedProcedure, router } from "./trpc";
import { getPostedTasks } from "api";

export const t = initTRPC.create();

export const appRouter = router({
  tasks: protectedProcedure.query(async ({ ctx }) => {
    const tasks = await getPostedTasks(ctx.user.id);

    return {
      tasks,
    };
  }),
});

export type AppRouter = typeof appRouter;
