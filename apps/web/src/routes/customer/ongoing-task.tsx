import Card from "@/components/card";
import Loading from "@/components/loading";
import { useBackButton } from "@/hooks/use-back-button";
import { useMainButton } from "@/hooks/use-main-button";
import { trpc } from "@/lib/trpc";
import { WebApp } from "@grammyjs/web-app";
import { ChevronRightIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate, useParams } from "react-router-dom";

export const OngoingTask = () => {
  const params = useParams();
  const taskId = params["taskId"]!;
  const getOngoingTaskQuery = trpc.getOngoingTask.useQuery({
    taskId,
  });
  const cancelTaskMutation = trpc.cancelTask.useMutation({
    onSuccess() {
      navigate("/customer/ongoing");
    },
  });

  const navigate = useNavigate();

  useBackButton({
    show: true,
    onClick() {
      navigate("/customer");
    },
  });

  useMainButton({
    show: true,
    onClick() {
      document.getElementById("chat")?.click();
    },
    text: "Chat",
  });

  if (getOngoingTaskQuery.isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-4">
      <div className="flex flex-col gap-4">
        <div className="space-y-2">
          <div className="text-hint">Task</div>
          <Card>{getOngoingTaskQuery.data?.task.description}</Card>
        </div>
        <div className="space-y-2">
          <div className="text-hint">Actions</div>
          <Link
            to={`/customer/tasker/${getOngoingTaskQuery.data?.task.taskerId}`}
            className="flex w-full items-center justify-between rounded-md bg-background p-4"
          >
            <span className="flex items-center gap-2">
              <UserCircleIcon className="h-5 w-5" />
              View tasker profile
            </span>
            <ChevronRightIcon className="h-5 w-5" />
          </Link>
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
