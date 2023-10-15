import { db, tasks, users } from "db";
import { sql, and, eq } from "drizzle-orm";
import { searchDb, Task, tasksSchema } from "search-db";
import { getTaskerProposals } from "./proposals";
import { getUsername } from "./users";

export async function getPostedTasksCount({
  customerId,
}: {
  customerId: number;
}) {
  const result = await db
    .select({ count: sql<number>`count(*)` })
    .from(tasks)
    .where(and(eq(tasks.customerId, customerId), eq(tasks.status, "posted")));

  return result[0].count;
}

export async function searchTasks({ taskerId }: { taskerId: number }) {
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

export async function getPostedTasks({ customerId }: { customerId: number }) {
  const postedTasks = await db.query.tasks.findMany({
    columns: {
      id: true,
      description: true,
    },
    where: and(eq(tasks.customerId, customerId), eq(tasks.status, "posted")),
  });

  return postedTasks;
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

export async function deleteTask({ taskId }: { taskId: string }) {
  await db.delete(tasks).where(eq(tasks.id, taskId));
  await searchDb.collections<Task>(tasksSchema.name).documents().delete(taskId);
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

export async function getCustomerOngoingTasks({
  customerId,
}: {
  customerId: number;
}) {
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
    where: and(eq(tasks.customerId, customerId), eq(tasks.status, "ongoing")),
  });

  return ongoingTasks;
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

export async function getCustomerOngoingTask({ taskId }: { taskId: string }) {
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

export async function finishTask({ taskId }: { taskId: string }) {
  await db
    .update(tasks)
    .set({
      status: "finished",
    })
    .where(eq(tasks.id, taskId));
}

export async function getTaskerFinishedTasks({
  taskerId,
}: {
  taskerId: number;
}) {
  const finishedTasks = await db.query.tasks.findMany({
    where: and(eq(tasks.taskerId, taskerId), eq(tasks.status, "finished")),
  });

  return finishedTasks;
}

export async function getCustomerFinishedTasks({
  customerId,
}: {
  customerId: number;
}) {
  const finishedTasks = await db.query.tasks.findMany({
    with: {
      tasker: {
        columns: {
          id: true,
          fullName: true,
        },
      },
    },
    where: and(eq(tasks.customerId, customerId), eq(tasks.status, "finished")),
  });

  return finishedTasks;
}
