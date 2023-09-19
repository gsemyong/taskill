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
          model_name: "openai/text-embedding-ada-002",
          api_key: process.env.OPENAI_API_KEY,
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
        from: ["description"],
        model_config: {
          model_name: "openai/text-embedding-ada-002",
          api_key: process.env.OPENAI_API_KEY,
        },
      },
    },
  ],
};
