import Card from "@/components/card";
import Loading from "@/components/loading";
import { useBackButton } from "@/hooks/use-back-button";
import { useMainButton } from "@/hooks/use-main-button";
import { trpc } from "@/lib/trpc";
import { Link, useNavigate } from "react-router-dom";

export const PostedTasks = () => {
  useBackButton({
    show: true,
    onClick() {
      navigate("/customer");
    },
  });
  const getPostedTasksQuery = trpc.getPostedTasks.useQuery();

  const navigate = useNavigate();

  useMainButton({
    show: true,
    onClick() {
      navigate("/customer/new");
    },
    text: "Add new task",
  });

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
              <Link key={task.id} to={`/customer/post/${task.id}`}>
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
