import MainLayout from "@/components/main-layout";
import { useBackButton } from "@/hooks/use-back-button";
import { useMainButton } from "@/hooks/use-main-button";
import { trpc } from "@/lib/trpc";
import { WebApp } from "@grammyjs/web-app";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes";

export const Onboarding = () => {
  const navigate = useNavigate();
  useBackButton({
    show: false,
  });

  useMainButton({
    show: true,
    onClick() {
      if (fullName.length === 0 || profile.length === 0) {
        WebApp.showAlert("Please fill all the fields");
      } else {
        setUserDataMutation.mutate({ fullName, profile });
      }
    },
    text: "Finish setup",
  });

  const utils = trpc.useContext();
  const setUserDataMutation = trpc.setUserData.useMutation({
    onSuccess: () => {
      utils.getUser.invalidate();
      navigate(ROUTES.TASKER.MENU.path, {
        replace: true,
      });
    },
  });

  const [fullName, setFullName] = useState("");
  const [profile, setProfile] = useState("");

  return (
    <MainLayout header="Getting started" subHeader="Finish your profile setup">
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
