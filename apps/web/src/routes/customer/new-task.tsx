import { useBackButton } from "@/hooks/use-back-button";
import { useMainButton } from "@/hooks/use-main-button";
import { trpc } from "@/lib/trpc";
import { WebApp } from "@grammyjs/web-app";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes";

export const NewTask = () => {
  const navigate = useNavigate();
  const utils = trpc.useContext();
  const addTaskMutation = trpc.tasks.add.useMutation({
    onSettled() {
      utils.tasks.postedTasks.invalidate();
    },
    onSuccess() {
      navigate(ROUTES.CUSTOMER.POSTED_TASKS.path);
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
        addTaskMutation.mutate({ description });
      }
    },
    text: "Post new task",
    progress: addTaskMutation.isLoading,
  });

  const [description, setDescription] = useState("");

  return (
    <div className="p-4">
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
  );
};
