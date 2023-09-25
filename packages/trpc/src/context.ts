import { validateWebAppData } from "@grammyjs/validator";
import { WebApp } from "@grammyjs/web-app";
import type { inferAsyncReturnType } from "@trpc/server";
import type { CreateHTTPContextOptions } from "@trpc/server/adapters/standalone";
import { env } from "./env";

type InitData = typeof WebApp.initDataUnsafe;

export async function createContext(opts: CreateHTTPContextOptions) {
  console.log(opts.req.headers.initData);

  const initDataParams = new URLSearchParams(
    opts.req.headers.initData as string
  );

  if (!validateWebAppData(env.BOT_TOKEN, initDataParams)) {
    throw new Error("Invalid initData");
  }

  const initData = Object.fromEntries(
    initDataParams.entries()
  ) as unknown as InitData;

  return {
    user: initData.user,
    chat: initData.chat,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;
