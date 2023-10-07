import Card from "@/components/card";
import MainLayout from "@/components/main-layout";
import { useBackButton } from "@/hooks/use-back-button";
import { useMainButton } from "@/hooks/use-main-button";
import { trpc } from "@/lib/trpc";
import { WebApp } from "@grammyjs/web-app";
import { PlusIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export const PostedTasks = () => {
  useBackButton(true);
  const utils = trpc.useContext();
  const getPostedTasksQuery = trpc.getPostedTasks.useQuery();
  const deleteTaskMutation = trpc.deleteTask.useMutation({
    onSuccess: () => {
      utils.getPostedTasks.invalidate();
    },
  });

  useMainButton({
    show: false,
  });

  return (
    <MainLayout header="Posted tasks">
      <div className="space-y-4">
        {getPostedTasksQuery.data?.tasks.length === 0 ? (
          <>
            <div className="text-hint">
              You have no posted tasks, go add one
            </div>
            <Link
              to="/customer/new"
              className="text-md flex w-full items-center justify-center gap-2 rounded-lg bg-primary p-2 font-medium text-primary-foreground"
            >
              <PlusIcon className="h-5 w-5" />
              Add new task
            </Link>
          </>
        ) : (
          <>
            {getPostedTasksQuery.data?.tasks.map((task) => (
              <Card>
                <div className="flex items-center justify-between">
                  <div className="text-lg font-semibold">{task.title}</div>
                  <button
                    onClick={() => {
                      WebApp.showConfirm(
                        "Are you sure you want to delete this task?",
                        (ok) => {
                          if (ok) {
                            deleteTaskMutation.mutate({
                              taskId: task.id,
                            });
                          }
                        },
                      );
                    }}
                  >
                    <XCircleIcon className="h-5 w-5" />
                  </button>
                </div>
                <div className="text-hint">{task.description}</div>
              </Card>
            ))}
          </>
        )}
        {}
      </div>
    </MainLayout>
  );
};
