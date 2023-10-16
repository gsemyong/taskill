import { protectedProcedure, router } from "../trpc";
import {
  acceptProposal,
  createProposal,
  deleteProposal,
  getPostedTask,
  getProposal,
  getTaskProposals,
  getTaskerProposals,
  notifyCustomerOfNewProposal,
} from "api";
import { z } from "zod";

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
      await notifyCustomerOfNewProposal({
        customerId: task.customerId,
        proposalId: proposal.id,
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
