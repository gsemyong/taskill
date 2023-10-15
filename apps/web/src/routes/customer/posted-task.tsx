import { useTypedParams } from "react-router-typesafe-routes/dom";
import Card from "@/components/card";
import { useBackButton } from "@/hooks/use-back-button";
import { useMainButton } from "@/hooks/use-main-button";
import { trpc } from "@/lib/trpc";
import { WebApp } from "@grammyjs/web-app";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes";
import Loading from "@/components/loading";

export const PostedTask = () => {
  const { taskId } = useTypedParams(ROUTES.CUSTOMER.POSTED_TASK);
  const postedTaskQuery = trpc.tasks.postedTask.useQuery({
    taskId,
  });
  const taskProposalsQuery = trpc.proposals.taskProposals.useQuery({
    taskId,
  });

  const loading = postedTaskQuery.isLoading || taskProposalsQuery.isLoading;

  const navigate = useNavigate();
  useBackButton({
    show: true,
    onClick() {
      navigate(ROUTES.CUSTOMER.POSTED_TASKS.path);
    },
  });

  const utils = trpc.useContext();
  const deleteTaskMutation = trpc.tasks.delete.useMutation({
    onSettled() {
      utils.tasks.postedTasks.invalidate();
    },
    onSuccess() {
      navigate(ROUTES.CUSTOMER.POSTED_TASKS.path);
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
    progress: deleteTaskMutation.isLoading,
  });

  if (loading) {
    return <Loading />;
  }

  if (!postedTaskQuery.data || !taskProposalsQuery.data) {
    return null;
  }

  return (
    <div className="p-4">
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="text-hint">Task</div>
          <Card>{postedTaskQuery.data.task.description}</Card>
        </div>
        {taskProposalsQuery.data.proposals.length === 0 ? (
          <div className="text-hint">
            There are no proposals for this task yet
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="font-medium text-hint">Proposals</div>
            {taskProposalsQuery.data.proposals.map((proposal) => (
              <Link
                to={ROUTES.CUSTOMER.PROPOSAL.buildPath({
                  proposalId: proposal.id,
                })}
              >
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
