import { Menu } from "@grammyjs/menu";
import { getPostedTasksCount, getTaskerProfile, searchTasks } from "api";
import { MyContext } from "./types";
import {
  customerAddNewTaskConversation,
  taskerEditProfileConversation,
} from "./conversations";

export const manageProfileMenu = new Menu<MyContext>("manage-profile-menu")
  .text("✏️ Edit profile", async (ctx) => {
    return await ctx.conversation.enter(taskerEditProfileConversation.name);
  })
  .row()
  .webApp("Open my app", "https://elegant-corgi-obviously.ngrok-free.app")
  .row();

export const taskerMenu = new Menu<MyContext>("tasker-menu")
  .text("👤 Manage profile", async (ctx) => {
    if (!ctx.from?.id) {
      throw new Error("No user ID found");
    }

    const profile = await getTaskerProfile(ctx.from.id);

    if (!profile) {
      throw new Error("No profile found");
    }

    await ctx.reply("Your profile");
    return await ctx.reply(profile, { reply_markup: manageProfileMenu });
  })
  .row()
  .text("🔎 Discover tasks", async (ctx) => {
    if (!ctx.from?.id) {
      throw new Error("No user ID found");
    }

    await searchTasks(ctx.from.id);
  })
  .row()
  .text(
    async (ctx) => {
      return `❓ Manage tasks waiting for approval`;
    },
    (ctx) => ctx.reply("You pressed B!")
  )
  .row()
  .text("📅 Manage scheduled tasks", (ctx) => ctx.reply("You pressed B!"))
  .row()
  .text("⌛ View past tasks", (ctx) => ctx.reply("You pressed B!"))
  .row();

export const customerMenu = new Menu<MyContext>("customer-menu")
  .text("✨ Add a new task", (ctx) =>
    ctx.conversation.enter(customerAddNewTaskConversation.name)
  )
  .row()
  .webApp(async (ctx) => {
    if (!ctx.from?.id) {
      throw new Error("No user ID found");
    }

    const pendingTasksCount = await getPostedTasksCount(ctx.from.id);

    return `🤙 Manage posted tasks (${pendingTasksCount})`;
  }, "https://elegant-corgi-obviously.ngrok-free.app/manage-tasks")
  .row()
  .text(
    async (ctx) => {
      return `❓ Manage tasks waiting for approval`;
    },
    (ctx) => ctx.reply("You pressed B!")
  )
  .row()
  .text("📅 Manage scheduled tasks", (ctx) => ctx.reply("You pressed B!"))
  .row()
  .text("⌛ View past tasks", (ctx) => ctx.reply("You pressed B!"))
  .row();
