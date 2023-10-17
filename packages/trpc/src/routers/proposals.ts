import { protectedProcedure, router } from "../trpc";
import {
  acceptProposal,
  createProposal,
  deleteProposal,
  getPostedTask,
  getProposal,
  getTaskProposals,
  getTaskerProposals,
  sendNotification,
} from "api";
import { InlineKeyboard } from "grammy";
import { z } from "zod";
import { env } from "../env";

export const proposalsRouter = router({
  proposal: protectedProcedure
    .input(
      z.object({
        proposalId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const proposal = await getProposal({
        proposalId: input.proposalId,
      });

      return {
        proposal,
      };
    }),
  taskerProposals: protectedProcedure.query(async ({ ctx }) => {
    const proposals = await getTaskerProposals({
      taskerId: ctx.user.id,
    });

    return {
      proposals,
    };
  }),
  taskProposals: protectedProcedure
    .input(
      z.object({
        taskId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const proposals = await getTaskProposals({
        taskId: input.taskId,
      });

      return {
        proposals,
      };
    }),
  create: protectedProcedure
    .input(
      z.object({
        note: z.string(),
        taskId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const proposal = await createProposal({
        taskerId: ctx.user.id,
        note: input.note,
        taskId: input.taskId,
      });
      const task = await getPostedTask({
        taskId: input.taskId,
      });
      await sendNotification({
        userId: task.customerId,
        text: `You have a new proposal for task: ${task.description}`,
        replyMarkup: new InlineKeyboard().webApp(
          "View proposal",
          `${env.WEB_APP_URL}/customer/proposal/${proposal.id}`
        ),
      });
    }),
  delete: protectedProcedure
    .input(
      z.object({
        proposalId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      await deleteProposal({
        proposalId: input.proposalId,
      });
    }),
  accept: protectedProcedure
    .input(
      z.object({
        proposalId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      await acceptProposal({
        proposalId: input.proposalId,
      });
    }),
});
