import Card from "@/components/card";
import Loading from "@/components/loading";
import { useBackButton } from "@/hooks/use-back-button";
import { useMainButton } from "@/hooks/use-main-button";
import { trpc } from "@/lib/trpc";
import { Link, useNavigate } from "react-router-dom";

export const Discover = () => {
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

  const discoverTasksQuery = trpc.discoverTasks.useQuery();

  if (discoverTasksQuery.isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-4">
      {discoverTasksQuery.data?.tasks.length === 0 ? (
        <div className="text-hint">
          There are no tasks available for you, please check again later
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <div className="text-hint">Tasks for you</div>
          {discoverTasksQuery.data?.tasks.map((task) => (
            <Link to={`/tasker/make-proposal/${task.taskId}`}>
              <Card>
                <div>{task.description}</div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};