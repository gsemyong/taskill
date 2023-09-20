import { CollectionCreateSchema } from "typesense/lib/Typesense/Collections";
import { z } from "zod";

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

export const tasksSchema: CollectionCreateSchema = {
  name: "tasks",
  fields: [
    {
      name: "description",
      type: "string",
    },
    {
      name: "customer_id",
      type: "int32",
      indexed: false,
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

export const taskerSchemaZod = z.object({
  id: z.number(),
  profile: z.string(),
});

export type Tasker = z.infer<typeof taskerSchemaZod>;

export const taskSchemaZod = z.object({
  customer_id: z.number(),
  description: z.string(),
});

export type Task = z.infer<typeof taskSchemaZod>;
