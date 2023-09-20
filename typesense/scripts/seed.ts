import { faker } from "@faker-js/faker";
import { typesense } from "@/typesense";
import { taskersSchema } from "@/typesense/schema";

const taskers = Array.from({ length: 1000 }, (_, i) => ({
  id: i.toString(),
  profile: faker.person.bio(),
}));

await typesense.collections(taskersSchema.name).documents().import(taskers, {
  action: "emplace",
});

console.log("Seeded taskers");
