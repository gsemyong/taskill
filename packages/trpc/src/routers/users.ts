import { getTaskerInfo, getUser, getUsername, setTaskerInfo } from "api";
import { protectedProcedure, router } from "../trpc";
import { z } from "zod";

export const usersRouter = router({
  user: protectedProcedure.query(async ({ ctx }) => {
    const user = await getUser({ userId: ctx.user.id });

    return {
      user,
    };
  }),
  tasker: protectedProcedure
    .input(
      z.object({
        taskerId: z.number(),
      })
    )
    .query(async ({ input }) => {
      const { fullName, profile } = await getTaskerInfo({
        taskerId: input.taskerId,
      });
      const username = await getUsername({ userId: input.taskerId });

      return {
        tasker: {
          fullName,
          profile,
          username,
        },
      };
    }),
  setTaskerInfo: protectedProcedure
    .input(
      z.object({
        fullName: z.string(),
        profile: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await setTaskerInfo({
        taskerId: ctx.user.id,
        fullName: input.fullName,
        profile: input.profile,
      });
    }),
});
