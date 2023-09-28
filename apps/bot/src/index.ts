import "dotenv/config";
import { session } from "grammy";
import { conversations, createConversation } from "@grammyjs/conversations";
import { bot } from "./bot";
import {
  customerAddNewTaskConversation,
  taskerEditProfileConversation,
  taskerOnboardingConversation,
} from "./conversations";
import { customerMenu, manageProfileMenu, taskerMenu } from "./menus";
import { commands } from "./commands";

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

await bot.api.setMyCommands(
  commands.map((command) => ({
    command: command.name,
    description: command.description,
  }))
);

for (const command of commands) {
  bot.command(command.name, command.handler);
}

bot.start();
