import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { env } from "./env";
import * as schema from "./schema";

const client = createClient({
  url: env.DB_URL,
  authToken: env.DB_AUTH_TOKEN,
});

export const db = drizzle(client, {
  schema,
});

export * from "./schema";
export * from "drizzle-orm";
