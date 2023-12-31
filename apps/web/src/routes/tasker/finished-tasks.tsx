import Card from "@/components/card";
import Loading from "@/components/loading";
import { useBackButton } from "@/hooks/use-back-button";
import { useMainButton } from "@/hooks/use-main-button";
import { trpc } from "@/lib/trpc";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes";

export const FinishedTasks = () => {
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

  const getTaskerFinishedTasksQuery = trpc.tasks.taskerFinishedTasks.useQuery();

  if (getTaskerFinishedTasksQuery.isLoading) {
    return <Loading />;
  }

  if (!getTaskerFinishedTasksQuery.data) {
    return null;
  }

  return (
    <div className="p-4">
      <div className="space-y-2">
        <div className="text-hint">Finished tasks</div>
        <div className="flex flex-col gap-2">
          {getTaskerFinishedTasksQuery.data.tasks.map((task) => (
            <Card key={task.id}>{task.description}</Card>
          ))}
        </div>
      </div>
    </div>
  );
};
