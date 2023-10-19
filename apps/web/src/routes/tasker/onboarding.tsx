import { useBackButton } from "@/hooks/use-back-button";
import { useMainButton } from "@/hooks/use-main-button";
import { trpc } from "@/lib/trpc";
import { WebApp } from "@grammyjs/web-app";
import { useState } from "react";
import Loading from "@/components/loading";
import { useUploadThing } from "@/lib/uploadthing";

export const Onboarding = () => {
  const userQuery = trpc.users.user.useQuery();

  const { permittedFileInfo, startUpload } = useUploadThing(
    "verificationDocument",
    {},
  );
  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : [];

  useBackButton({
    show: false,
  });

  useMainButton({
    show: userQuery.data?.user.verificationStatus === "unverified",
    async onClick() {
      if (
        fullName.length === 0 ||
        profile.length === 0 ||
        !verificationDocument
      ) {
        WebApp.showAlert("Please fill all the fields");
      } else {
        const res = await startUpload([verificationDocument]);

        if (!res || res.length === 0) {
          WebApp.showAlert("Something went wrong");
          return;
        }

        const imageKey = res[0].name;
        sendTaskerInfoForVerificationMutation.mutate({
          fullName,
          profile,
          imageKey,
        });
      }
    },
    text: "Finish setup",
  });

  const utils = trpc.useContext();
  const sendTaskerInfoForVerificationMutation =
    trpc.users.sendTaskerInfoForVerification.useMutation({
      onSuccess: () => {
        utils.users.user.invalidate();
      },
    });

  const [fullName, setFullName] = useState("");
  const [profile, setProfile] = useState("");
  const [verificationDocument, setVerificationDocument] = useState<File>();

  if (userQuery.isLoading) {
    return <Loading />;
  }

  if (!userQuery.data) {
    return null;
  }

  if (userQuery.data.user.verificationStatus === "pending") {
    return <div className="p-4 text-hint">Your data is being verified</div>;
  }

  if (userQuery.data.user.verificationStatus === "unverified") {
    return (
      <div className="p-4">
        <div className="mb-4 text-xl font-semibold">Verify your profile</div>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="fullName" className="text-hint">
              Full name
            </label>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              id="fullName"
              name="fullName"
              placeholder="Your full name as in governmental ID."
              className="rounded-md border-none bg-background focus:ring-primary"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="profile" className="text-hint">
              Profile
            </label>
            <textarea
              value={profile}
              onChange={(e) => setProfile(e.target.value)}
              id="profile"
              name="profile"
              rows={6}
              placeholder="Write about your skills, experience and other details that will help you get more tasks."
              className="rounded-md border-none bg-background focus:ring-primary"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="verificationDocument" className="text-hint">
              Verification document
            </label>
            <input
              className="cursor-pointer file:rounded-md file:border-none file:bg-primary file:px-4 file:py-2 file:text-primary-foreground file:shadow-none"
              type="file"
              id="verificationDocument"
              name="verificationDocument"
              accept={fileTypes.join(", ")}
              onChange={(e) => {
                if (!e.target.files || e.target.files.length === 0) {
                  setVerificationDocument(undefined);
                } else {
                  const file = e.target.files[0];
                  setVerificationDocument(file);
                }
              }}
            />
          </div>
        </div>
      </div>
    );
  }
};
