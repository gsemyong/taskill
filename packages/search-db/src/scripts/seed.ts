import { faker } from "@faker-js/faker";
import { searchDb } from "../index";
import { taskersSchema } from "../schema";

const taskers = Array.from({ length: 1000 }, (_, i) => ({
  id: i.toString(),
  profile: faker.person.bio(),
}));

await searchDb.collections(taskersSchema.name).documents().import(taskers, {
  action: "emplace",
});

console.log("Seeded taskers");
