import { searchDb } from "../index";

const collections = await searchDb.collections().retrieve();

collections.forEach(async (collection) => {
  await searchDb.collections(collection.name).delete();
});

console.log("Collections deleted");
