import { createUploadthing, type FileRouter } from "uploadthing/fastify";

const f = createUploadthing();

export const uploadRouter: FileRouter = {
  videoAndImage: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 4,
    },
    video: {
      maxFileSize: "16MB",
    },
  }).onUploadComplete((data) => {
    console.log("upload completed", data);
  }),
};

export type OurFileRouter = typeof uploadRouter;
