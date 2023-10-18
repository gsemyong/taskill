import { Bot } from "grammy";
import { remember } from "@epic-web/remember";
import { env } from "./env";

export const bot = remember(
  "bot",
  () =>
    new Bot(env.BOT_TOKEN, {
      client: {
        buildUrl(root, token, method) {
          return `${root}/bot${token}/${
            env.NODE_ENV === "development" ? "test/" : ""
          }${method}`;
        },
      },
    })
);

export * from "./menus";
