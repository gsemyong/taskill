import MainLayout from "@/components/main-layout";
import { WebApp } from "@grammyjs/web-app";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const PostNewTask = () => {
  const navigate = useNavigate();

  useEffect(() => {
    WebApp.BackButton.show();

    WebApp.MainButton.setText("Post");
    WebApp.MainButton.show();
  }, [navigate]);

  return (
    <MainLayout header="Post new task">
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-hint">
            Title
          </label>
          <input
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
            id="title"
            name="title"
            rows={6}
            placeholder="Delails about the task. You can specify the location, urgency and other details here."
            className="rounded-md border-none bg-background focus:ring-primary"
          />
        </div>
      </div>
    </MainLayout>
  );
};
