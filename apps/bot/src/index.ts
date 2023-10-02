import "dotenv/config";
import { bot } from "./bot";

bot.api.setChatMenuButton({
  menu_button: {
    text: "Open app",
    type: "web_app",
    web_app: {
      url: "https://elegant-corgi-obviously.ngrok-free.app/customer",
    },
  },
});

bot.command("start", (ctx) => ctx.reply("Hello world!"));

bot.start();
