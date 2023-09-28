import { CommandContext } from "grammy";
import { MyContext } from "./types";
import { createUser, getTaskerProfile } from "api";
import { customerMenu, taskerMenu } from "./menus";
import { taskerOnboardingConversation } from "./conversations";

type Command = {
  name: string;
  description: string;
  handler: (ctx: CommandContext<MyContext>) => Promise<void>;
};

export const commands: Command[] = [
  {
    name: "start",
    description: "Start the bot",
    async handler(ctx) {
      await ctx.reply("Welcome to Dilo Bot!🤖");

      if (!ctx.from?.id) {
        throw new Error("No user ID found");
      }

      await createUser({
        id: ctx.from?.id,
        chatId: ctx.chat.id,
      });

      await ctx.reply("Explore the menu to get started 🚀");
    },
  },
  {
    name: "tasker_menu",
    description: "Open the tasker menu",
    async handler(ctx) {
      if (!ctx.from?.id) {
        throw new Error("No user ID found");
      }

      const profile = await getTaskerProfile(ctx.from.id);

      if (!profile) {
        return await ctx.conversation.enter(taskerOnboardingConversation.name);
      }

      await ctx.reply("Tasker menu", {
        reply_markup: taskerMenu,
      });
    },
  },
  {
    name: "customer_menu",
    description: "Open the customer menu",
    async handler(ctx) {
      await ctx.reply("Customer menu", {
        reply_markup: customerMenu,
      });
    },
  },
];
