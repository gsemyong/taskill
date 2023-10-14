import Card from "@/components/card";
import Loading from "@/components/loading";
import { useBackButton } from "@/hooks/use-back-button";
import { useMainButton } from "@/hooks/use-main-button";
import { trpc } from "@/lib/trpc";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes";

export const PostedTasks = () => {
  const navigate = useNavigate();
  useBackButton({
    show: true,
    onClick() {
      navigate(ROUTES.CUSTOMER.MENU.path);
    },
  });
  useMainButton({
    show: true,
    onClick() {
      navigate(ROUTES.CUSTOMER.NEW_TASK.path);
    },
    text: "Add new task",
  });

  const getPostedTasksQuery = trpc.getPostedTasks.useQuery();

  if (getPostedTasksQuery.isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-4">
      {getPostedTasksQuery.data?.tasks.length === 0 ? (
        <div className="text-hint">You have no posted tasks</div>
      ) : (
        <div className="space-y-2">
          <div className="text-hint">Posted tasks</div>
          <div className="flex flex-col gap-2">
            {getPostedTasksQuery.data?.tasks.map((task) => (
              <Link
                key={task.id}
                to={ROUTES.CUSTOMER.POSTED_TASK.buildPath({
                  taskId: task.id,
                })}
              >
                <Card>
                  <div>{task.description}</div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
