import MainLayout from "@/components/main-layout";
import { useBackButton } from "@/hooks/use-back-button";
import { useMainButton } from "@/hooks/use-main-button";
import { trpc } from "@/lib/trpc";
import { WebApp } from "@grammyjs/web-app";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const PostNewTask = () => {
  const postTaskMutation = trpc.postTask.useMutation({
    onSuccess: () => {
      navigate("/customer/posted", {
        replace: true,
      });
    },
  });

  useBackButton({
    show: true,
    onClick() {
      navigate(-1);
    },
  });

  useMainButton({
    show: true,
    onClick() {
      if (description.length === 0) {
        WebApp.showAlert("Please provide a detailed description");
      } else {
        postTaskMutation.mutate({ description });
      }
    },
    text: "Post new task",
  });

  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  return (
    <MainLayout header="Post new task">
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="text-hint">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="description"
            name="description"
            rows={6}
            placeholder="Delails about the task. You can specify the location, urgency and other details here."
            className="rounded-md border-none bg-background focus:ring-primary"
          />
        </div>
      </div>
    </MainLayout>
  );
};
