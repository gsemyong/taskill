import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    BOT_TOKEN: z.string().min(1),
    DEBUG: z.string(),
    OPEN_AI_API_KEY: z.string().min(1),
  },
  runtimeEnv: process.env,
});
