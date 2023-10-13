import Card from "@/components/card";
import Loading from "@/components/loading";
import { useBackButton } from "@/hooks/use-back-button";
import { useMainButton } from "@/hooks/use-main-button";
import { trpc } from "@/lib/trpc";
import { Link, useNavigate } from "react-router-dom";

export const FinishedTasks = () => {
  const getFinishedTasksQuery = trpc.getFinishedTasks.useQuery();

  const navigate = useNavigate();

  useBackButton({
    show: true,
    onClick() {
      navigate("/customer");
    },
  });

  useMainButton({
    show: false,
  });

  if (getFinishedTasksQuery.isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-4">
      <div className="space-y-2">
        <div className="text-hint">Finished tasks</div>
        <div className="flex flex-col gap-2">
          {getFinishedTasksQuery.data?.tasks.map((task) => (
            <Card key={task.id}>
              <div>{task.description}</div>
              <Link
                to={`/customer/tasker/${task.taskerId}`}
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
