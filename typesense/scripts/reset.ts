import { typesense } from "@/typesense";

const collections = await typesense.collections().retrieve();

collections.forEach(async (collection) => {
  await typesense.collections(collection.name).delete();
});

console.log("Collections deleted");
