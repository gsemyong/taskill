import { Bot } from "grammy";
import { MyContext } from "./types";
import { env } from "./env";
import { remember } from "@epic-web/remember";

export const bot = remember("bot", () => new Bot<MyContext>(env.BOT_TOKEN));
