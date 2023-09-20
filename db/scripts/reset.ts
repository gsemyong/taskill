import { db } from "@/db";
import { tasks, users } from "@/db/schema";

await db.delete(users).returning();

console.log("Deleted users");

await db.delete(tasks).returning();

console.log("Deleted tasks");
