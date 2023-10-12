import Card from "@/components/card";
import Loading from "@/components/loading";
import { useBackButton } from "@/hooks/use-back-button";
import { useMainButton } from "@/hooks/use-main-button";
import { trpc } from "@/lib/trpc";
import { Link, useNavigate } from "react-router-dom";

export const OngoingTasks = () => {
  const navigate = useNavigate();
  useBackButton({
    show: true,
    onClick() {
      navigate("/tasker");
    },
  });
  useMainButton({
    show: false,
  });

  const getOnoingTasksQuery = trpc.getTaskerOngoingTasks.useQuery();

  if (getOnoingTasksQuery.isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-4">
      {getOnoingTasksQuery.data?.tasks.length === 0 ? (
        <div className="text-hint">You have no ongoing tasks</div>
      ) : (
        <div className="space-y-2">
          <div className="text-hint">Ongoing tasks</div>
          <div className="flex flex-col gap-2">
            {getOnoingTasksQuery.data?.tasks.map((task) => (
              <Link to={`/tasker/ongoing/${task.id}`}>
                <Card>{task.description}</Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
