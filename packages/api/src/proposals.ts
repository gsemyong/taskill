import { db, proposals, tasks } from "db";
import { and, eq } from "drizzle-orm";
import { getUsername } from "./users";
import { searchDb, type Task, tasksSchema } from "search-db";

export async function createProposal({
  note,
  taskerId,
  taskId,
}: {
  note: string;
  taskerId: number;
  taskId: string;
}) {
  const insertedProposals = await db
    .insert(proposals)
    .values({
      note,
      taskerId,
      taskId,
    })
    .returning();

  return insertedProposals[0];
}

export async function getTaskerProposals({ taskerId }: { taskerId: number }) {
  const taskerProposals = await db.query.proposals.findMany({
    with: {
      task: {
        columns: {
          id: true,
          description: true,
        },
      },
    },
    columns: {
      note: true,
      id: true,
    },
    where: eq(proposals.taskerId, taskerId),
  });

  return taskerProposals;
}

export async function deleteProposal({ proposalId }: { proposalId: string }) {
  await db.delete(proposals).where(eq(proposals.id, proposalId));
}

export async function getTaskProposals({ taskId }: { taskId: string }) {
  const taskProposals = await db.query.proposals.findMany({
    with: {
      tasker: {
        columns: {
          id: true,
          fullName: true,
        },
      },
    },
    columns: {
      id: true,
      note: true,
      taskId: true,
    },
    where: eq(proposals.taskId, taskId),
  });

  return taskProposals;
}

export async function getProposal({ proposalId }: { proposalId: string }) {
  console.log("Trying to get proposal");

  const proposal = await db.query.proposals.findFirst({
    columns: {
      note: true,
    },
    with: {
      task: {
        columns: {
          description: true,
        },
      },
      tasker: {
        columns: {
          id: true,
          fullName: true,
        },
      },
    },
    where: eq(proposals.id, proposalId),
  });

  if (!proposal) {
    throw new Error("No proposal found");
  }

  const taskerUsername = await getUsername({
    userId: proposal.tasker.id,
  });

  return {
    ...proposal,
    taskerUsername,
  };
}

export async function acceptProposal({ proposalId }: { proposalId: string }) {
  db.transaction(async (tx) => {
    const proposal = await tx.query.proposals.findFirst({
      where: eq(proposals.id, proposalId),
    });

    if (!proposal) {
      throw new Error("No proposal found");
    }

    await tx.delete(proposals).where(eq(proposals.taskId, proposal.taskId));
    await searchDb
      .collections<Task>(tasksSchema.name)
      .documents()
      .delete(proposal.taskId);
    await tx
      .update(tasks)
      .set({ taskerId: proposal.taskerId, status: "ongoing" })
      .where(eq(tasks.id, proposal.taskId));
  });
}
