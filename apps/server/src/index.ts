import "dotenv/config";

import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import fastify from "fastify";
import { appRouter, createContext } from "trpc";
import cors from "@fastify/cors";

const server = fastify({
  maxParamLength: 5000,
});

await server.register(cors, {
  origin: "*",
});

await server.register(fastifyTRPCPlugin, {
  prefix: "/trpc",
  trpcOptions: { router: appRouter, createContext },
});

(async () => {
  try {
    await server.listen({ port: 2022 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
})();
