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

export async function updateProfile({
  userId,
  profile,
}: {
  userId: number;
  profile: string;
}) {
  const result = await db
    .update(users)
    .set({
      taskerProfile: profile,
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

export async function getTaskerProfile(userId: number) {
  const user = await db.query.users.findFirst({
    columns: {
      taskerProfile: true,
    },
    where: eq(users.id, userId),
  });

  if (!user) {
    throw new Error("No tasker found");
  }

  return user.taskerProfile;
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
      taskerProfile: true,
    },
    where: eq(users.id, userId),
  });

  if (!user) {
    throw new Error("No tasker found");
  }

  if (!user.taskerProfile) {
    throw new Error("No profile found");
  }

  const { hits } = await searchDb
    .collections(tasksSchema.name)
    .documents()
    .search({
      q: user.taskerProfile,
      query_by: "description,embedding",
      exclude_fields: "embedding",
      per_page: 10,
    });

  console.log(hits);
}

export async function getPostedTasks(userId: number) {
  const postedTasks = await db.query.tasks.findMany({
    columns: {
      customerId: true,
      description: true,
    },
    where: and(eq(tasks.customerId, userId), eq(tasks.status, "posted")),
  });

  return postedTasks;
}
