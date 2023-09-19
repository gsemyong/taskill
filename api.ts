import { db } from "@/db";
import { customers, taskers, tasks } from "@/db/schema";
import { and, eq, sql } from "drizzle-orm";

export async function createUser(id: number) {
  await db
    .insert(customers)
    .values({
      id,
    })
    .onConflictDoNothing();

  await db
    .insert(taskers)
    .values({
      id,
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
  await db.insert(tasks).values({
    customerId,
    description,
  });
}

export async function getPostedTasksCount(customerId: number) {
  const result = await db
    .select({ count: sql<number>`count(*)` })
    .from(tasks)
    .where(and(eq(tasks.customerId, customerId), eq(tasks.status, "posted")));

  return result[0].count;
}

export async function updateProfile({
  taskerId,
  profile,
}: {
  taskerId: number;
  profile: string;
}) {
  await db
    .update(taskers)
    .set({
      profile,
    })
    .where(eq(taskers.id, taskerId));
}

export async function getTaskerProfile(taskerId: number) {
  const tasker = await db.query.taskers.findFirst({
    columns: {
      profile: true,
    },
    where: eq(taskers.id, taskerId),
  });

  if (!tasker) {
    throw new Error("No tasker found");
  }

  return tasker.profile;
}
