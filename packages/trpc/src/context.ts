import type { inferAsyncReturnType } from "@trpc/server";
import type { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";

export async function createContext(opts: CreateFastifyContextOptions) {
  return {};
}

export type Context = inferAsyncReturnType<typeof createContext>;
