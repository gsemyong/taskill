import { initTRPC } from "@trpc/server";
import { Context } from "./context";

const t = initTRPC.context<Context>().create();

const middleware = t.middleware;

const isAuthed = middleware(({ next, ctx }) => {
  if (!ctx.user || !ctx.chat) {
    throw new Error("Not authenticated");
  }

  return next({
    ctx: {
      user: ctx.user,
      chat: ctx.chat,
    },
  });
});

export const router = t.router;

export const procedure = t.procedure.use(isAuthed);
