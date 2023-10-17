import { createUploadthing, type FileRouter } from "uploadthing/fastify";

const f = createUploadthing();

export const uploadRouter: FileRouter = {
  verificationDocument: f(["image"]).onUploadComplete((data) => {
    console.log("upload completed", data);
  }),
};

export type OurFileRouter = typeof uploadRouter;
