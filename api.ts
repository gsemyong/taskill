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

export async function getPendingTasksCount(customerId: number) {
  const result = await db
    .select({ count: sql<number>`count(*)` })
    .from(tasks)
    .where(and(eq(tasks.customerId, customerId), eq(tasks.status, "pending")));

  return result[0].count;
}
