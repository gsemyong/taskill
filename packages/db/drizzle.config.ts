import "dotenv/config";
import type { Config } from "drizzle-kit";
import { env } from "./src/env";

export default {
  schema: "./src/schema.ts",
  driver: "turso",
  dbCredentials: {
    url: env.DB_URL,
    authToken: env.DB_AUTH_TOKEN,
  },
} satisfies Config;
