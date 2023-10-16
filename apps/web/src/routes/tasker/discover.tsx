import Card from "@/components/card";
import Loading from "@/components/loading";
import { useBackButton } from "@/hooks/use-back-button";
import { useMainButton } from "@/hooks/use-main-button";
import { trpc } from "@/lib/trpc";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes";

export const Discover = () => {
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

  const searchTasksQuery = trpc.tasks.search.useQuery();

  if (searchTasksQuery.isLoading) {
    return <Loading />;
  }

  if (!searchTasksQuery.data) {
    return null;
  }

  return (
    <div className="p-4">
      {searchTasksQuery.data.tasks.length === 0 ? (
        <div className="text-hint">
          There are no tasks available for you, please check again later
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <div className="text-hint">Tasks for you</div>
          {searchTasksQuery.data.tasks.map((task) => (
            <Link
              to={ROUTES.TASKER.NEW_PROPOSAL.buildPath({
                taskId: task.taskId,
              })}
            >
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
