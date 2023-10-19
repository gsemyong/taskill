import { getTaskerInfo, getUser, getUsername, setTaskerInfo } from "api";
import { protectedProcedure, router } from "../trpc";
import { db, eq, users } from "db";
import { z } from "zod";
import { utapi } from "file-uploads";

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
  sendTaskerInfoForVerification: protectedProcedure
    .input(
      z.object({
        fullName: z.string(),
        profile: z.string(),
        imageKey: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await db
        .update(users)
        .set({
          fullName: input.fullName,
          profile: input.profile,
          imageKey: input.imageKey,
          verificationStatus: "pending",
        })
        .where(eq(users.id, ctx.user.id));
    }),
});
