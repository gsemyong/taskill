import { protectedProcedure, router } from "../trpc";
import {
  addTask,
  deleteTask,
  getCustomerOngoingTasks,
  getPostedTask,
  getPostedTasks,
  searchTasks,
  getCustomerOngoingTask,
  finishTask,
  getTaskerOngoingTasks,
  getTaskerOngoingTask,
  getTaskerFinishedTasks,
  getCustomerFinishedTasks,
} from "api";
import { z } from "zod";

export const tasksRouter = router({
  postedTasks: protectedProcedure.query(async ({ ctx }) => {
    const tasks = await getPostedTasks({
      customerId: ctx.user.id,
    });

    return {
      tasks,
    };
  }),
  postedTask: protectedProcedure
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
  customerOngoingTasks: protectedProcedure.query(async ({ ctx }) => {
    const tasks = await getCustomerOngoingTasks({
      customerId: ctx.user.id,
    });

    return {
      tasks,
    };
  }),
  customerOngoingTask: protectedProcedure
    .input(
      z.object({
        taskId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const task = await getCustomerOngoingTask({
        taskId: input.taskId,
      });

      return task;
    }),
  taskerOngoingTasks: protectedProcedure.query(async ({ ctx }) => {
    const tasks = await getTaskerOngoingTasks({
      taskerId: ctx.user.id,
    });

    return {
      tasks,
    };
  }),
  taskerOngoingTask: protectedProcedure
    .input(
      z.object({
        taskId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const task = await getTaskerOngoingTask({
        taskId: input.taskId,
      });

      return task;
    }),
  taskerFinishedTasks: protectedProcedure.query(async ({ ctx }) => {
    const tasks = await getTaskerFinishedTasks({
      taskerId: ctx.user.id,
    });

    return {
      tasks,
    };
  }),
  customerFinishedTasks: protectedProcedure.query(async ({ ctx }) => {
    const tasks = await getCustomerFinishedTasks({
      customerId: ctx.user.id,
    });

    return {
      tasks,
    };
  }),
  search: protectedProcedure.query(async ({ ctx }) => {
    const tasks = await searchTasks({
      taskerId: ctx.user.id,
    });

    if (!tasks) {
      throw new Error("Error getting tasks");
    }

    return {
      tasks,
    };
  }),
  add: protectedProcedure
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
  delete: protectedProcedure
    .input(
      z.object({
        taskId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      await deleteTask({
        taskId: input.taskId,
      });
    }),
  finish: protectedProcedure
    .input(
      z.object({
        taskId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      await finishTask({
        taskId: input.taskId,
      });
    }),
});
