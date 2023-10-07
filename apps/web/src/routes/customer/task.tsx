import Card from "@/components/card";
import MainLayout from "@/components/main-layout";
import { useBackButton } from "@/hooks/use-back-button";
import { useMainButton } from "@/hooks/use-main-button";
import { trpc } from "@/lib/trpc";
import { WebApp } from "@grammyjs/web-app";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useNavigate, useParams } from "react-router-dom";

export const Task = () => {
  const navigate = useNavigate();

  const params = useParams();
  const taskId = params["taskId"]!;

  const getTaskQuery = trpc.getTask.useQuery({
    taskId,
  });

  const utils = trpc.useContext();

  const deleteTaskMutation = trpc.deleteTask.useMutation({
    onSuccess: () => {
      utils.getPostedTasks.invalidate();
      navigate("/customer/posted", {
        replace: true,
      });
    },
  });

  useBackButton({
    show: true,
    onClick() {
      navigate("/customer/posted");
    },
  });

  useMainButton({
    show: true,
    onClick() {
      WebApp.showConfirm("Are you sure you want to delete this task?", (ok) => {
        if (ok) {
          deleteTaskMutation.mutate({ taskId });
        }
      });
    },
    text: "Delete task",
    danger: true,
  });

  return (
    <MainLayout header="Task">
      <div className="space-y-4">
        <Card>{getTaskQuery.data?.task.description}</Card>
      </div>
    </MainLayout>
  );
};
