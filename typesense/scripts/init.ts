import "dotenv/config";
import { typesense } from "@/typesense";
import { taskersSchema, tasksSchema } from "@/typesense/schema";

const collections = await typesense.collections().retrieve();

if (collections.length > 0) {
  console.log("Collections already exist");
  process.exit(0);
}

await typesense.collections().create(tasksSchema);
await typesense.collections().create(taskersSchema);

console.log("Collections created");
