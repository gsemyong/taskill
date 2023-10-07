import { initTRPC } from "@trpc/server";
import { protectedProcedure, router } from "./trpc";
import {
  addTask,
  deleteTask,
  getPostedTask,
  getPostedTasks,
  getUser,
  searchTasks,
  setUserData,
} from "api";
import { z } from "zod";

export const t = initTRPC.create();

export const appRouter = router({
  getPostedTasks: protectedProcedure.query(async ({ ctx }) => {
    const tasks = await getPostedTasks(ctx.user.id);

    return {
      tasks,
    };
  }),
  postTask: protectedProcedure
    .input(
      z.object({
        description: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await addTask({
        customerId: ctx.user.id,
        description: input.description,
      });
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
  getUser: protectedProcedure.query(async ({ ctx }) => {
    const user = await getUser({ userId: ctx.user.id });

    return {
      user,
    };
  }),
  setUserData: protectedProcedure
    .input(
      z.object({
        fullName: z.string(),
        profile: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await setUserData({
        userId: ctx.user.id,
        fullName: input.fullName,
        profile: input.profile,
      });
    }),
  discoverTasks: protectedProcedure.query(async ({ ctx }) => {
    const tasks = await searchTasks(ctx.user.id);

    if (!tasks) {
      throw new Error("Error getting tasks");
    }

    return {
      tasks,
    };
  }),
  getTask: protectedProcedure
    .input(
      z.object({
        taskId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const task = await getPostedTask({ taskId: input.taskId });

      return {
        task,
      };
    }),
  createProposal: protectedProcedure
    .input(
      z.object({
        note: z.string(),
        taskId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {}),
});

export type AppRouter = typeof appRouter;
