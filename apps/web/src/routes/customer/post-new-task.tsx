import MainLayout from "@/components/main-layout";
import { useBackButton } from "@/hooks/use-back-button";
import { trpc } from "@/lib/trpc";
import { WebApp } from "@grammyjs/web-app";
import { RocketLaunchIcon } from "@heroicons/react/24/outline";
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

  useBackButton(true);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  return (
    <MainLayout header="Post new task">
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-hint">
            Title
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="title"
            name="title"
            placeholder="Short descriptive name for a task."
            className="rounded-md border-none bg-background focus:ring-primary"
          />
        </div>
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
        <button
          onClick={() => {
            if (title.length === 0 || description.length === 0) {
              WebApp.showAlert("Please fill all the fields");
            } else {
              postTaskMutation.mutate({ title, description });
            }
          }}
          className="text-md flex w-full items-center justify-center gap-2 rounded-lg bg-primary p-2 font-medium text-primary-foreground"
        >
          <RocketLaunchIcon className="h-5 w-5" />
          Post new task
        </button>
      </div>
    </MainLayout>
  );
};
