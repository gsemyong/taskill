import Card from "@/components/card";
import Loading from "@/components/loading";
import { useBackButton } from "@/hooks/use-back-button";
import { useMainButton } from "@/hooks/use-main-button";
import { trpc } from "@/lib/trpc";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes";

export const FinishedTasks = () => {
  const navigate = useNavigate();
  useBackButton({
    show: true,
    onClick() {
      navigate(ROUTES.CUSTOMER.MENU.path);
    },
  });
  useMainButton({
    show: false,
  });

  const finishedTasksQuery = trpc.tasks.customerFinishedTasks.useQuery();

  if (finishedTasksQuery.isLoading) {
    return <Loading />;
  }

  if (!finishedTasksQuery.data) {
    return null;
  }

  return (
    <div className="p-4">
      <div className="space-y-2">
        <div className="text-hint">Finished tasks</div>
        <div className="flex flex-col gap-2">
          {finishedTasksQuery.data.tasks.map((task) => (
            <Card key={task.id}>
              <div>{task.description}</div>
              <Link
                to={ROUTES.CUSTOMER.TASKER_PROFILE.buildPath({
                  taskerId: task.taskerId!,
                })}
                className="text-link"
              >
                {task.tasker?.fullName}
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
