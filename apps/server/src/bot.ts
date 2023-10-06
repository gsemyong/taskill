import { Bot } from "grammy";
import { env } from "./env";
import { remember } from "@epic-web/remember";

export const bot = remember("bot", () => new Bot(env.BOT_TOKEN));
