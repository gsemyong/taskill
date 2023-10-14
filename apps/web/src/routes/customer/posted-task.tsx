import { useTypedParams } from "react-router-typesafe-routes/dom";
import Card from "@/components/card";
import { useBackButton } from "@/hooks/use-back-button";
import { useMainButton } from "@/hooks/use-main-button";
import { trpc } from "@/lib/trpc";
import { WebApp } from "@grammyjs/web-app";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes";

export const PostedTask = () => {
  const { taskId } = useTypedParams(ROUTES.CUSTOMER.POSTED_TASK);
  const getTaskQuery = trpc.getTask.useQuery({
    taskId,
  });
  const getTaskProposals = trpc.getTaskProposals.useQuery({
    taskId,
  });

  const loading = getTaskQuery.isLoading || getTaskProposals.isLoading;

  const navigate = useNavigate();
  useBackButton({
    show: true,
    onClick() {
      navigate("/customer/posted");
    },
  });

  useMainButton({
    show: !loading,
    onClick() {
      WebApp.showConfirm("Are you sure you want to delete this task?", (ok) => {
        if (ok) {
          deleteTaskMutation.mutate({
            taskId,
          });
        }
      });
    },
    text: "Delete task",
    danger: true,
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

  if (loading) {
    return (
      <div
        className={`flex w-full items-center justify-center`}
        style={{
          height: WebApp.viewportStableHeight,
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-12 w-12 animate-spin text-primary"
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="text-hint">Task</div>
          <Card>{getTaskQuery.data?.task.description}</Card>
        </div>
        {getTaskProposals.data?.proposals.length === 0 ? (
          <div className="text-hint">
            There are no proposals for this task yet
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="font-medium text-hint">Proposals</div>
            {getTaskProposals.data?.proposals.map((proposal) => (
              <Link to={`/customer/proposal/${proposal.id}`}>
                <Card>
                  <div>{proposal.note}</div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
