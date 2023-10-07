import Card from "@/components/card";
import MainLayout from "@/components/main-layout";
import { useBackButton } from "@/hooks/use-back-button";
import { useMainButton } from "@/hooks/use-main-button";
import { trpc } from "@/lib/trpc";
import { BriefcaseIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";

export const DiscoverTasks = () => {
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

  return (
    <MainLayout header="Discover tasks">
      <div className="space-y-4">
        {discoverTasksQuery.data?.tasks.length === 0 ? (
          <div className="text-hint">
            There are no tasks available for you, please check again later
          </div>
        ) : (
          <>
            {discoverTasksQuery.data?.tasks.map((task) => (
              <Card>
                <div>{task.description}</div>
                <div className="flex gap-2 self-end">
                  <Link
                    to={`/tasker/proposal/${task.taskId}`}
                    className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-primary-foreground"
                  >
                    <BriefcaseIcon className="h-5 w-5" />
                    Make a proposal
                  </Link>
                </div>
              </Card>
            ))}
          </>
        )}
      </div>
    </MainLayout>
  );
};
