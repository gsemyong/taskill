import { bot } from "bot";
import { db, users, tasks, proposals } from "db";
import { and, eq, sql } from "drizzle-orm";
import { searchDb, Task, Tasker, taskersSchema, tasksSchema } from "search-db";

export async function createUser({
  id,
  chatId,
}: {
  id: number;
  chatId: number;
}) {
  await db
    .insert(users)
    .values({
      id,
      chatId,
    })
    .onConflictDoNothing();
}

export async function addTask({
  customerId,
  description,
}: {
  customerId: number;
  description: string;
}) {
  const result = await db
    .insert(tasks)
    .values({
      customerId,
      description,
    })
    .returning({
      taskId: tasks.id,
    });

  const taskId = result[0].taskId;

  await searchDb.collections<Task>(tasksSchema.name).documents().upsert(
    {
      id: taskId,
      customer_id: customerId,
      description,
    },
    {
      action: "emplace",
    }
  );
}

export async function getPostedTasksCount(customerId: number) {
  const result = await db
    .select({ count: sql<number>`count(*)` })
    .from(tasks)
    .where(and(eq(tasks.customerId, customerId), eq(tasks.status, "posted")));

  return result[0].count;
}

export async function setUserData({
  userId,
  fullName,
  profile,
}: {
  userId: number;
  fullName: string;
  profile: string;
}) {
  const result = await db
    .update(users)
    .set({
      fullName,
      profile,
    })
    .where(eq(users.id, userId))
    .returning({
      chatId: users.chatId,
    });

  const chatId = result[0].chatId;

  await searchDb.collections<Tasker>(taskersSchema.name).documents().upsert(
    {
      id: userId.toString(),
      user_id: userId,
      chat_id: chatId,
      profile,
    },
    {
      action: "emplace",
    }
  );
}

export async function getTaskerData(userId: number) {
  const user = await db.query.users.findFirst({
    columns: {
      fullName: true,
      profile: true,
    },
    where: eq(users.id, userId),
  });

  if (!user) {
    throw new Error("No tasker found");
  }

  return user;
}

export async function searchTaskers(taskDescription: string) {
  const { hits } = await searchDb
    .collections<Tasker>(taskersSchema.name)
    .documents()
    .search({
      q: taskDescription,
      query_by: "profile,embedding",
      exclude_fields: "embedding",
      per_page: 10,
    });

  if (!hits) {
    throw new Error("No hits found");
  }

  console.log(hits);

  return hits.map((hit) => ({
    userId: hit.document.user_id,
    chatId: hit.document.chat_id,
    profile: hit.document.profile,
  }));
}

export async function searchTasks(taskerId: number) {
  const user = await db.query.users.findFirst({
    columns: {
      profile: true,
    },
    where: eq(users.id, taskerId),
  });

  if (!user) {
    throw new Error("No tasker found");
  }

  if (!user.profile) {
    throw new Error("No profile found");
  }

  const taskerProposals = await getTaskerProposals({
    taskerId: taskerId,
  });

  const { hits } = await searchDb
    .collections<Task>(tasksSchema.name)
    .documents()
    .search({
      q: user.profile,
      query_by: "description,embedding",
      exclude_fields: "embedding",
      per_page: 10,
    });

  return hits
    ?.map((hit) => ({
      taskId: hit.document.id,
      customerId: hit.document.customer_id,
      description: hit.document.description,
    }))
    .filter((task) => {
      if (
        taskerProposals.find((proposal) => proposal.task.id === task.taskId)
      ) {
        return false;
      }

      return true;
    });
}

export async function getPostedTasks(userId: number) {
  const postedTasks = await db.query.tasks.findMany({
    columns: {
      id: true,
      description: true,
    },
    where: and(eq(tasks.customerId, userId), eq(tasks.status, "posted")),
  });

  return postedTasks;
}

export async function deleteTask({
  taskId,
  userId,
}: {
  taskId: string;
  userId: number;
}) {
  await db
    .delete(tasks)
    .where(and(eq(tasks.id, taskId), eq(tasks.customerId, userId)));
  await searchDb.collections<Task>(tasksSchema.name).documents().delete(taskId);
}

export async function getUser({ userId }: { userId: number }) {
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });

  if (!user) {
    throw new Error("No user found");
  }

  return user;
}

export async function getPostedTask({ taskId }: { taskId: string }) {
  const task = await db.query.tasks.findFirst({
    where: and(eq(tasks.id, taskId), eq(tasks.status, "posted")),
  });

  if (!task) {
    throw new Error("No task found");
  }

  return task;
}

export async function createProposal({
  note,
  taskerId,
  taskId,
}: {
  note: string;
  taskerId: number;
  taskId: string;
}) {
  await db.insert(proposals).values({
    note,
    taskerId,
    taskId,
  });
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

export async function deleteProposal({
  proposalId,
  userId,
}: {
  proposalId: string;
  userId: number;
}) {
  await db
    .delete(proposals)
    .where(and(eq(proposals.id, proposalId), eq(proposals.taskerId, userId)));
}

export async function getTaskProposals({
  taskId,
  userId,
}: {
  taskId: string;
  userId: number;
}) {
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
    where: and(eq(proposals.taskId, taskId), eq(proposals.taskerId, userId)),
  });

  return taskProposals;
}

export async function getProposal({ proposalId }: { proposalId: string }) {
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

export async function getUsername({ userId }: { userId: number }) {
  const user = await db.query.users.findFirst({
    columns: {
      id: true,
      chatId: true,
    },
    where: eq(users.id, userId),
  });

  if (!user) {
    throw new Error("No user found");
  }

  const { user: chatUser } = await bot.api.getChatMember(user.chatId, userId);

  if (!chatUser.username) {
    throw new Error("No username found");
  }

  return chatUser.username;
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

export async function getOngoingTasks({ userId }: { userId: number }) {
  const ongoingTasks = await db.query.tasks.findMany({
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
      description: true,
    },
    where: and(eq(tasks.customerId, userId), eq(tasks.status, "ongoing")),
  });

  return ongoingTasks;
}

export async function getOngoingTask({ taskId }: { taskId: string }) {
  const ongoingTask = await db.query.tasks.findFirst({
    where: eq(tasks.id, taskId),
  });

  if (!ongoingTask) {
    throw new Error("No ongoing task found");
  }

  const taskerUsername = await getUsername({
    userId: ongoingTask.taskerId!,
  });

  return {
    task: {
      description: ongoingTask.description,
      taskerId: ongoingTask.taskerId!,
      taskerUsername,
    },
  };
}

export async function cancelTask({ taskId }: { taskId: string }) {
  await db.delete(tasks).where(eq(tasks.id, taskId));
}

export async function getTaskerOngoingTasks({
  taskerId,
}: {
  taskerId: number;
}) {
  const ongoingTasks = await db.query.tasks.findMany({
    columns: {
      id: true,
      description: true,
    },
    where: and(eq(tasks.taskerId, taskerId), eq(tasks.status, "ongoing")),
  });

  return ongoingTasks;
}

export async function getTaskerOngoingTask({ taskId }: { taskId: string }) {
  const ongoingTask = await db.query.tasks.findFirst({
    where: eq(tasks.id, taskId),
  });

  if (!ongoingTask) {
    throw new Error("No ongoing task found");
  }

  const customerUsername = await getUsername({
    userId: ongoingTask.customerId!,
  });

  return {
    task: {
      description: ongoingTask.description,
      customerUsername,
    },
  };
}
