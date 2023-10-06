import "dotenv/config";
import { bot } from "./bot";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import fastify from "fastify";
import { appRouter, createContext } from "trpc";
import cors from "@fastify/cors";

bot.api.setChatMenuButton({
  menu_button: {
    text: "Open app",
    type: "web_app",
    web_app: {
      url: "https://elegant-corgi-obviously.ngrok-free.app/tasker",
    },
  },
});

bot.command("start", (ctx) => ctx.reply("Hello world!"));

bot.start();

const server = fastify({
  maxParamLength: 5000,
});

await server.register(cors, {
  origin: "*",
});

await server.register(fastifyTRPCPlugin, {
  prefix: "/trpc",
  trpcOptions: { router: appRouter, createContext },
});

(async () => {
  try {
    await server.listen({ port: 2022 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
})();
