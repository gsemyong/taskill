import { Bot, Context, session } from "grammy";
import { Menu } from "@grammyjs/menu";
import {
  type Conversation,
  type ConversationFlavor,
  conversations,
  createConversation,
} from "@grammyjs/conversations";
import {
  addTask,
  createUser,
  getPostedTasks,
  getPostedTasksCount,
  getTaskerProfile,
  searchTaskers,
  searchTasks,
  updateProfile,
} from "api";
import { env } from "./env";

type MyContext = Context & ConversationFlavor;
type MyConversation = Conversation<MyContext>;

export const bot = new Bot<MyContext>(env.BOT_TOKEN);

async function customerAddNewTaskConversation(
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

  const taskers = await searchTaskers(description);

  for (const tasker of taskers) {
    const { user } = await bot.api.getChatMember(tasker.chatId, tasker.userId);

    await bot.api.sendMessage(tasker.chatId, "New task is available for you!");
    await bot.api.sendMessage(
      tasker.chatId,
      `${description}\n\n@${user.username}`
    );
  }

  await ctx.reply("Task added successfully!");
}

async function taskerOnboardingConversation(
  conversation: MyConversation,
  ctx: MyContext
) {
  if (!ctx.from?.id) {
    throw new Error("No user ID found");
  }

  await ctx.reply(
    "Let's get started! In order to start receiving tasks you need to fill in your profile information. Please provide exact and full information about the services you provide."
  );
  let { message: profileMessage } = await conversation.wait();

  if (!profileMessage) {
    throw new Error("No message found");
  }

  const profile = profileMessage.text;

  if (!profile) {
    throw new Error("No description found");
  }

  await updateProfile({
    userId: ctx.from.id,
    profile,
  });

  await ctx.reply(
    "Profile successfully updated! You can now start receiving tasks. When a customer posts a task that matches your qualification, you will receive a notification with task details and customer's contact info. You can then contact the customer and agree on the details of the task. Once the task is completed, you can mark it as finished and receive payment."
  );
}

async function taskerEditProfileConversation(
  conversation: MyConversation,
  ctx: MyContext
) {
  if (!ctx.from?.id) {
    throw new Error("No user ID found");
  }

  await ctx.reply(
    "Enter your new profile information. Please provide exact and full information about the services you provide."
  );

  let { message: profileMessage } = await conversation.wait();

  if (!profileMessage) {
    throw new Error("No message found");
  }

  const profile = profileMessage.text;

  if (!profile) {
    throw new Error("No description found");
  }

  await updateProfile({
    userId: ctx.from.id,
    profile,
  });

  await ctx.reply("Profile successfully updated!");
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

const manageProfileMenu = new Menu<MyContext>("manage-profile-menu")
  .text("✏️ Edit profile", async (ctx) => {
    return await ctx.conversation.enter(taskerEditProfileConversation.name);
  })
  .row()
  .webApp("Open my app", "https://elegant-corgi-obviously.ngrok-free.app")
  .row();

const taskerMenu = new Menu<MyContext>("tasker-menu")
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
    ctx.conversation.enter(customerAddNewTaskConversation.name)
  )
  .row()
  .text(
    async (ctx) => {
      if (!ctx.from?.id) {
        throw new Error("No user ID found");
      }

      const pendingTasksCount = await getPostedTasksCount(ctx.from.id);

      return `🤙 Manage posted tasks (${pendingTasksCount})`;
    },
    async (ctx) => {
      const postedTasks = await getPostedTasks(ctx.from.id);

      for (const task of postedTasks) {
        await ctx.reply(task.description);
      }
    }
  )
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
  .text("⌛ View tasks history", (ctx) => ctx.reply("You pressed B!"))
  .row()
  .text("⚙️ Manage settings", (ctx) => ctx.reply("You pressed B!"))
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
bot.use(createConversation(customerAddNewTaskConversation));
bot.use(createConversation(taskerOnboardingConversation));
bot.use(createConversation(taskerEditProfileConversation));

bot.use(manageProfileMenu);
bot.use(taskerMenu);
bot.use(customerMenu);

bot.command("start", async (ctx) => {
  await ctx.reply("Welcome to Dilo Bot!🤖");

  if (!ctx.from?.id) {
    throw new Error("No user ID found");
  }

  await createUser({
    id: ctx.from?.id,
    chatId: ctx.chat.id,
  });

  return await ctx.reply("Explore the menu to get started 🚀");
});

bot.command("tasker_menu", async (ctx) => {
  if (!ctx.from?.id) {
    throw new Error("No user ID found");
  }

  const profile = await getTaskerProfile(ctx.from.id);

  if (!profile) {
    return await ctx.conversation.enter(taskerOnboardingConversation.name);
  }

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

bot.on("message:web_app_data", (ctx) => console.log("Got some data"));
