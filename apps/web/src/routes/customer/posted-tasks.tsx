import Card from "@/components/card";
import MainLayout from "@/components/main-layout";
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

  return (
    <MainLayout header="Posted tasks">
      {getPostedTasksQuery.data?.tasks.length === 0 ? (
        <div className="text-hint">You have no posted tasks</div>
      ) : (
        <div className="flex flex-col gap-4">
          {getPostedTasksQuery.data?.tasks.map((task) => (
            <Link key={task.id} to={`/customer/post/${task.id}`}>
              <Card>
                <div>{task.description}</div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </MainLayout>
  );
};
