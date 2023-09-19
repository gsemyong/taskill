import Typesense from "typesense";

export const typesense = new Typesense.Client({
  nodes: [
    {
      host: "localhost",
      port: 8118,
      protocol: "http",
    },
  ],
  apiKey: "xyz",
  connectionTimeoutSeconds: 2,
});
