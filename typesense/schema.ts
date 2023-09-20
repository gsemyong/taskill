import { CollectionCreateSchema } from "typesense/lib/Typesense/Collections";

export const tasksSchema: CollectionCreateSchema = {
  name: "tasks",
  fields: [
    {
      name: "description",
      type: "string",
    },
    {
      name: "embedding",
      type: "float[]",
      embed: {
        from: ["description"],
        model_config: {
          model_name: "ts/all-MiniLM-L12-v2",
        },
      },
    },
  ],
};

export const taskersSchema: CollectionCreateSchema = {
  name: "taskers",
  fields: [
    {
      name: "profile",
      type: "string",
    },
    {
      name: "embedding",
      type: "float[]",
      embed: {
        from: ["profile"],
        model_config: {
          model_name: "ts/all-MiniLM-L12-v2",
        },
      },
    },
  ],
};
