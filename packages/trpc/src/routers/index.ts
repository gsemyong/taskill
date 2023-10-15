import { router } from "../trpc";
import { proposalsRouter } from "./proposals";
import { tasksRouter } from "./tasks";
import { usersRouter } from "./users";

export const appRouter = router({
  tasks: tasksRouter,
  users: usersRouter,
  proposals: proposalsRouter,
});

export type AppRouter = typeof appRouter;
