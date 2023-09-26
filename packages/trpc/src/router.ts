import { initTRPC } from "@trpc/server";
import { protectedProcedure, router } from "./trpc";
import { deleteTask, getPostedTasks } from "api";
import { z } from "zod";

export const t = initTRPC.create();

export const appRouter = router({
  tasks: protectedProcedure.query(async ({ ctx }) => {
    const tasks = await getPostedTasks(ctx.user.id);

    return {
      tasks,
    };
  }),
  deleteTask: protectedProcedure
    .input(
      z.object({
        taskId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await deleteTask({
        taskId: input.taskId,
        userId: ctx.user.id,
      });
    }),
});

export type AppRouter = typeof appRouter;
