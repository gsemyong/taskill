import MainLayout from "@/components/main-layout";
import { useBackButton } from "@/hooks/use-back-button";
import { useMainButton } from "@/hooks/use-main-button";
import { trpc } from "@/lib/trpc";
import { WebApp } from "@grammyjs/web-app";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const EditProfile = () => {
  const utils = trpc.useContext();

  const setUserDataMutation = trpc.setUserData.useMutation({
    onSuccess: () => {
      utils.getUser.invalidate();
      navigate("/tasker/profile", {
        replace: true,
      });
    },
  });

  useBackButton(true);
  useMainButton({
    show: true,
    onClick() {
      if (fullName.length === 0 || profile.length === 0) {
        WebApp.showAlert("Please fill all the fields");
      } else {
        setUserDataMutation.mutate({ fullName, profile });
      }
    },
    text: "Save",
  });

  const getUserQuery = trpc.getUser.useQuery();

  const [fullName, setFullName] = useState(
    getUserQuery.data?.user.fullName ?? "",
  );
  const [profile, setProfile] = useState(getUserQuery.data?.user.profile ?? "");

  const navigate = useNavigate();

  return (
    <MainLayout header="Edit profile">
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
          <label htmlFor="description" className="text-hint">
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
      </div>
    </MainLayout>
  );
};
