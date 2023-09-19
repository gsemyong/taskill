import { sqliteTable, text, int } from "drizzle-orm/sqlite-core";
import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";

export const customers = sqliteTable("customers", {
  id: int("id").primaryKey().notNull().unique(),
});

export const customersRelations = relations(customers, ({ many }) => ({
  tasks: many(tasks),
}));

export const taskers = sqliteTable("taskers", {
  id: int("id").primaryKey().notNull().unique(),
  profile: text("profile"),
});

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
  customer: one(customers, {
    fields: [tasks.customerId],
    references: [customers.id],
  }),
}));
