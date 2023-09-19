import "dotenv/config";
import { Bot, Context, session } from "grammy";
import { Menu } from "@grammyjs/menu";
import {
  type Conversation,
  type ConversationFlavor,
  conversations,
  createConversation,
} from "@grammyjs/conversations";
import { addTask, createUser, getPendingTasksCount } from "@/api";

type MyContext = Context & ConversationFlavor;
type MyConversation = Conversation<MyContext>;

export const bot = new Bot<MyContext>(process.env.BOT_TOKEN!);

async function addNewTaskConversation(
  conversation: MyConversation,
  ctx: MyContext
) {
  if (!ctx.from?.id) {
    throw new Error("No user ID found");
  }

  await ctx.reply("Let's add a new task! Describe your task.");
  let { message: descriptionMessage } = await conversation.wait();

  if (!descriptionMessage) {
    throw new Error("No message found");
  }

  const description = descriptionMessage.text;

  if (!description) {
    throw new Error("No description found");
  }

  await addTask({
    customerId: ctx.from.id,
    description,
  });

  await ctx.reply("Task added successfully!");
}

await bot.api.setMyCommands([
  {
    command: "start",
    description: "Start the bot",
  },
  {
    command: "tasker_menu",
    description: "Open the tasker menu",
  },
  {
    command: "customer_menu",
    description: "Open the customer menu",
  },
]);

const taskerMenu = new Menu<MyContext>("tasker-menu")
  .text("👤 Manage profile", (ctx) => ctx.reply("You pressed A!"))
  .row()
  .text("🔎 Discover tasks", (ctx) => ctx.reply("You pressed B!"))
  .row()
  .text("📅 Manage scheduled tasks", (ctx) => ctx.reply("You pressed B!"))
  .row()
  .text("⌛ View past tasks", (ctx) => ctx.reply("You pressed B!"))
  .row()
  .text("⚙️ Manage settings", (ctx) => ctx.reply("You pressed B!"))
  .row()
  .text("💸 Manage payments", (ctx) => ctx.reply("You pressed B!"))
  .row()
  .text("🫶 Contact support", (ctx) => ctx.reply("You pressed B!"))
  .row();

const customerMenu = new Menu<MyContext>("customer-menu")
  .text("✨ Add a new task", (ctx) =>
    ctx.conversation.enter(addNewTaskConversation.name)
  )
  .row()
  .text(
    async (ctx) => {
      if (!ctx.from?.id) {
        throw new Error("No user ID found");
      }

      const pendingTasksCount = await getPendingTasksCount(ctx.from.id);

      return `🤙 Manage pending tasks (${pendingTasksCount})`;
    },
    (ctx) => ctx.reply("You pressed B!")
  )
  .row()
  .text("📅 Manage scheduled tasks", (ctx) => ctx.reply("You pressed B!"))
  .row()
  .text("⌛ View tasks history", (ctx) => ctx.reply("You pressed B!"))
  .row()
  .text("⚙️ Manage settings", (ctx) => ctx.reply("You pressed B!"))
  .row()
  .text("💸 Manage payments", (ctx) => ctx.reply("You pressed B!"))
  .row()
  .text("🫶 Contact support", (ctx) => ctx.reply("You pressed B!"))
  .row();

bot.use(
  session({
    initial() {
      return {};
    },
  })
);

bot.use(conversations());
bot.use(createConversation(addNewTaskConversation));

bot.use(taskerMenu);
bot.use(customerMenu);

bot.command("start", async (ctx) => {
  await ctx.reply("Welcome to Dilo Bot!🤖");

  if (!ctx.from?.id) {
    throw new Error("No user ID found");
  }

  await createUser(ctx.from.id);

  return await ctx.reply("Explore the menu to get started 🚀");
});

bot.command("tasker_menu", async (ctx) => {
  return await ctx.reply("Tasker menu", {
    reply_markup: taskerMenu,
  });
});

bot.command("customer_menu", async (ctx) => {
  return await ctx.reply("Customer menu", {
    reply_markup: customerMenu,
  });
});

bot.start();
