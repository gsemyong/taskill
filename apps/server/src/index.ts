import "dotenv/config";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import { appRouter, createContext } from "trpc";
import { bot, appsMenu } from "bot";
import { createUser } from "api";
import { uploadRouter, fastifyUploadthingPlugin } from "@dilo/uploadthing";
import fastify from "fastify";
import cors from "@fastify/cors";

bot.api.setMyCommands([
  {
    command: "start",
    description: "Start the bot",
  },
  {
    command: "apps",
    description: "List all apps",
  },
]);

bot.use(appsMenu);

bot.command("start", async (ctx) => {
  if (!ctx.from) {
    throw new Error("No from");
  }

  await createUser({
    id: ctx.from.id,
    chatId: ctx.chat.id,
  });

  await ctx.reply("Welcome to the bot");
});

bot.command("apps", (ctx) =>
  ctx.reply("Apps menu", {
    reply_markup: appsMenu,
  })
);

bot.start();

const server = fastify({
  logger: true,
  maxParamLength: 5000,
});

await server.register(cors, {
  origin: "*",
});

await server.register(fastifyUploadthingPlugin, {
  router: uploadRouter,
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
