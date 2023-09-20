import { db } from "@/db";
import { users, tasks } from "@/db/schema";
import { and, eq, sql } from "drizzle-orm";
import { typesense } from "./typesense";
import { Tasker, taskersSchema, tasksSchema } from "./typesense/schema";

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

  await typesense.collections(tasksSchema.name).documents().upsert(
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
  await db
    .update(users)
    .set({
      taskerProfile: profile,
    })
    .where(eq(users.id, userId));

  await typesense.collections(taskersSchema.name).documents().upsert(
    {
      id: userId.toString(),
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
  const { hits } = await typesense
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
    id: hit.document.id,
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

  const { hits } = await typesense
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
