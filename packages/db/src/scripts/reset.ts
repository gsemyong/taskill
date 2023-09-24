import { db } from "../index";
import { tasks, users } from "../schema";

await db.delete(users).returning();

console.log("Deleted users");

await db.delete(tasks).returning();

console.log("Deleted tasks");
