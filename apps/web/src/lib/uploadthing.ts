import { generateComponents } from "@uploadthing/react";
import { generateReactHelpers } from "@uploadthing/react/hooks";
import { OurFileRouter } from "file-uploads";

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>();

export const { UploadButton } = generateComponents<OurFileRouter>();
