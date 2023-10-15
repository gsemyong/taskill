import { getUser, setTaskerInfo } from "api";
import { protectedProcedure, router } from "../trpc";
import { z } from "zod";

export const usersRouter = router({
  user: protectedProcedure.query(async ({ ctx }) => {
    const user = await getUser({ userId: ctx.user.id });

    return {
      user,
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
