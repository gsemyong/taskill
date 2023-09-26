import type { WebApp } from "@grammyjs/web-app";
import { validateWebAppData } from "@grammyjs/validator";
import type { inferAsyncReturnType } from "@trpc/server";
import type { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";
import { env } from "./env";

export async function createContext(opts: CreateFastifyContextOptions) {
  const initDataParams = new URLSearchParams(
    opts.req.headers["init-data"] as string
  );

  if (!validateWebAppData(env.BOT_TOKEN, initDataParams)) {
    throw new Error("Invalid initData");
  }

  const user = JSON.parse(
    Object.fromEntries(initDataParams.entries()).user
  ) as WebAppInitData["user"];

  return {
    user,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;
