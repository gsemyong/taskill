import Card from "@/components/card";
import Loading from "@/components/loading";
import { useBackButton } from "@/hooks/use-back-button";
import { useMainButton } from "@/hooks/use-main-button";
import { trpc } from "@/lib/trpc";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes";

export const OngoingTasks = () => {
  const navigate = useNavigate();
  useBackButton({
    show: true,
    onClick() {
      navigate(ROUTES.TASKER.MENU.path);
    },
  });
  useMainButton({
    show: false,
  });

  const taskerOngoingTasksQuery = trpc.tasks.taskerOngoingTasks.useQuery();

  if (taskerOngoingTasksQuery.isLoading) {
    return <Loading />;
  }

  if (!taskerOngoingTasksQuery.data) {
    return null;
  }

  return (
    <div className="p-4">
      {taskerOngoingTasksQuery.data.tasks.length === 0 ? (
        <div className="text-hint">You have no ongoing tasks</div>
      ) : (
        <div className="space-y-2">
          <div className="text-hint">Ongoing tasks</div>
          <div className="flex flex-col gap-2">
            {taskerOngoingTasksQuery.data.tasks.map((task) => (
              <Link
                to={ROUTES.TASKER.ONGOING_TASK.buildPath({
                  taskId: task.id,
                })}
              >
                <Card>{task.description}</Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
