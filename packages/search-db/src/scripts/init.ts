import "dotenv/config";
import { searchDb } from "../index";
import { taskersSchema, tasksSchema } from "../schema";

const collections = await searchDb.collections().retrieve();

if (collections.length > 0) {
  console.log("Collections already exist");
  process.exit(0);
}

await searchDb.collections().create(tasksSchema);
await searchDb.collections().create(taskersSchema);

console.log("Collections created");
