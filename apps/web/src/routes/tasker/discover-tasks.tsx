import Card from "@/components/card";
import MainLayout from "@/components/main-layout";
import { useBackButton } from "@/hooks/use-back-button";
import { trpc } from "@/lib/trpc";
import { ArrowLeftIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export const DiscoverTasks = () => {
  useBackButton(true);

  const discoverTasksQuery = trpc.discoverTasks.useQuery();

  return (
    <MainLayout header="Discover tasks">
      <div className="space-y-4">
        {discoverTasksQuery.data?.tasks.length === 0 ? (
          <>
            <div className="text-hint">
              There are no tasks available for you, please check again later
            </div>
            <Link
              to="/tasker"
              className="text-md flex w-full items-center justify-center gap-2 rounded-lg bg-primary p-2 font-medium text-primary-foreground"
            >
              <ArrowLeftIcon className="h-5 w-5" />
              Back to the main menu
            </Link>
          </>
        ) : (
          <>
            {discoverTasksQuery.data?.tasks.map((task) => (
              <Card>
                <div className="text-lg font-semibold">{task.title}</div>
                <div className="text-hint">{task.description}</div>
                <div className="flex gap-2 self-end">
                  <button className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-primary-foreground">
                    <SparklesIcon className="h-5 w-5" />
                    I'm interested
                  </button>
                </div>
              </Card>
            ))}
          </>
        )}
      </div>
    </MainLayout>
  );
};
