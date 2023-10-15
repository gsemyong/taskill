import { protectedProcedure, router } from "../trpc";
import {
  acceptProposal,
  createProposal,
  deleteProposal,
  getProposal,
  getTaskProposals,
  getTaskerProposals,
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
      await createProposal({
        taskerId: ctx.user.id,
        note: input.note,
        taskId: input.taskId,
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
