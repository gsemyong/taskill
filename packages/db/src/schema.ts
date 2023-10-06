import { sqliteTable, text, int } from "drizzle-orm/sqlite-core";
import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";

export const users = sqliteTable("users", {
  id: int("id").primaryKey().notNull().unique(),
  chatId: int("chat_id").notNull().unique(),
  fullName: text("full_name"),
  profile: text("profile"),
});

export const usersRelations = relations(users, ({ many }) => ({
  customerTasks: many(tasks, {
    relationName: "customer",
  }),
  taskerTasks: many(tasks),
}));

export const tasks = sqliteTable("tasks", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  customerId: int("customer_id").notNull(),
  taskerId: int("tasker_id"),
  title: text("title").notNull(),
  description: text("description").notNull(),
  status: text("status", {
    enum: ["posted", "ongoing", "finished"],
  })
    .notNull()
    .default("posted"),
});

export const tasksRelations = relations(tasks, ({ one }) => ({
  customer: one(users, {
    fields: [tasks.customerId],
    references: [users.id],
  }),
  tasker: one(users, {
    fields: [tasks.taskerId],
    references: [users.id],
  }),
}));

export const proposals = sqliteTable("proposals", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  taskId: text("task_id").notNull(),
  taskerId: int("tasker_id").notNull(),
  note: text("note").notNull(),
});

export const proposalsRelations = relations(proposals, ({ one }) => ({
  task: one(tasks, {
    fields: [proposals.taskId],
    references: [tasks.id],
  }),
  tasker: one(users, {
    fields: [proposals.taskerId],
    references: [users.id],
  }),
}));
