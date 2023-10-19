import { createUploadthing, type FileRouter } from "uploadthing/fastify";
import { UTApi } from "uploadthing/server";

const f = createUploadthing();

export const uploadRouter = {
  verificationDocument: f(["image"]).onUploadComplete((data) => {
    console.log("upload completed", data);
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof uploadRouter;

export const utapi = new UTApi({});
