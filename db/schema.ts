import { sqliteTable, text, int } from "drizzle-orm/sqlite-core";
import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";

export const users = sqliteTable("users", {
  id: int("id").primaryKey().notNull().unique(),
  chatId: int("chat_id").notNull().unique(),
  taskerProfile: text("tasker_profile"),
});

export const usersRelations = relations(users, ({ many }) => ({
  customerTasks: many(tasks),
  taskerTasks: many(tasks),
}));

export const tasks = sqliteTable("tasks", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  customerId: int("customer_id").notNull(),
  description: text("description").notNull(),
  status: text("status", {
    enum: ["posted", "waiting", "scheduled", "finished"],
  })
    .notNull()
    .default("posted"),
});

export const tasksRelations = relations(tasks, ({ one }) => ({
  customer: one(users, {
    fields: [tasks.customerId],
    references: [users.id],
  }),
}));
