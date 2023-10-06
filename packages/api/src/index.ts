import { db, users, tasks } from "db";
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
  title,
  description,
}: {
  customerId: number;
  title: string;
  description: string;
}) {
  const result = await db
    .insert(tasks)
    .values({
      customerId,
      title,
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
      title,
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

export async function searchTasks(userId: number) {
  const user = await db.query.users.findFirst({
    columns: {
      profile: true,
    },
    where: eq(users.id, userId),
  });

  if (!user) {
    throw new Error("No tasker found");
  }

  if (!user.profile) {
    throw new Error("No profile found");
  }

  const { hits } = await searchDb
    .collections<Task>(tasksSchema.name)
    .documents()
    .search({
      q: user.profile,
      query_by: "description,embedding",
      exclude_fields: "embedding",
      per_page: 10,
    });

  return hits?.map((hit) => ({
    taskId: hit.document.id,
    customerId: hit.document.customer_id,
    title: hit.document.title,
    description: hit.document.description,
  }));
}

export async function getPostedTasks(userId: number) {
  const postedTasks = await db.query.tasks.findMany({
    columns: {
      id: true,
      title: true,
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
