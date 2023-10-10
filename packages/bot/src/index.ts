import { Bot } from "grammy";
import { remember } from "@epic-web/remember";
import { env } from "./env";

export const bot = remember("bot", () => new Bot(env.BOT_TOKEN));

export * from "./menus";
