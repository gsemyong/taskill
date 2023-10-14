import Card from "@/components/card";
import Loading from "@/components/loading";
import { useBackButton } from "@/hooks/use-back-button";
import { useMainButton } from "@/hooks/use-main-button";
import { trpc } from "@/lib/trpc";
import { WebApp } from "@grammyjs/web-app";
import { useNavigate, useParams } from "react-router-dom";

export const OngoingTask = () => {
  const navigate = useNavigate();
  useBackButton({
    show: true,
    onClick() {
      navigate("/tasker/ongoing");
    },
  });

  useMainButton({
    show: true,
    onClick() {
      document.getElementById("chat")?.click();
    },
    text: "Chat",
  });

  const params = useParams();
  const taskId = params["taskId"]!;
  const getTaskerOngoingTaskQuery = trpc.getTaskerOngoingTask.useQuery({
    taskId,
  });

  const cancelTaskMutation = trpc.cancelTask.useMutation({
    onSuccess() {
      navigate("/tasker/ongoing");
    },
  });
  const finishTaskMutation = trpc.finishTask.useMutation({
    onSuccess() {
      navigate("/tasker/ongoing");
    },
  });

  if (getTaskerOngoingTaskQuery.isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-4">
      <div className="flex flex-col gap-4">
        <div className="space-y-2">
          <div className="text-hint">Task</div>
          <Card>{getTaskerOngoingTaskQuery.data?.task.description}</Card>
        </div>
        <div className="space-y-2">
          <div className="text-hint">Actions</div>
          <button
            onClick={() => {
              WebApp.showConfirm(
                "Are you sure you want to mark this task as finished?",
                async (ok) => {
                  if (ok) {
                    finishTaskMutation.mutate({
                      taskId,
                    });
                  }
                },
              );
            }}
            className="w-full rounded-md bg-primary py-2 text-center text-primary-foreground"
          >
            Finish task
          </button>
          <button
            onClick={() => {
              WebApp.showConfirm(
                "Are you sure you want to cancel this task?",
                async (ok) => {
                  if (ok) {
                    cancelTaskMutation.mutate({
                      taskId,
                    });
                  }
                },
              );
            }}
            className="w-full rounded-md bg-rose-500 py-2 text-center text-primary-foreground"
          >
            Cancel task
          </button>
        </div>
      </div>
      <a className="hidden" id="chat" href="http://t.me/gsemyong/" />
    </div>
  );
};
