import MainLayout from "@/components/main-layout";
import { useBackButton } from "@/hooks/use-back-button";
import {
  ChevronRightIcon,
  WrenchScrewdriverIcon,
  UserCircleIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export const TaskerDashboard = () => {
  useBackButton(false);

  return (
    <MainLayout
      header="Tasker"
      action={
        <Link
          to="/tasker/discover"
          className="text-md flex items-center justify-center gap-2 rounded-lg bg-primary p-2 font-medium text-primary-foreground"
        >
          <SparklesIcon className="h-5 w-5" />
          Discover tasks
        </Link>
      }
    >
      <div className="space-y-4">
        <Link
          to="/tasker/interesting"
          className="flex w-full items-center justify-between rounded-md bg-background p-4"
        >
          <span className="flex items-center gap-2">
            <SparklesIcon className="h-5 w-5" />
            Interesting tasks (1)
          </span>
          <ChevronRightIcon className="h-5 w-5" />
        </Link>
        <Link
          to="/tasker/ongoing"
          className="flex w-full items-center justify-between rounded-md bg-background p-4"
        >
          <span className="flex items-center gap-2">
            <WrenchScrewdriverIcon className="h-5 w-5" />
            Ongoing tasks (1)
          </span>
          <ChevronRightIcon className="h-5 w-5" />
        </Link>
        <Link
          to="/tasker/profile"
          className="flex w-full items-center justify-between rounded-md bg-background p-4"
        >
          <span className="flex items-center gap-2">
            <UserCircleIcon className="h-5 w-5" />
            Profile
          </span>
          <ChevronRightIcon className="h-5 w-5" />
        </Link>
      </div>
    </MainLayout>
  );
};
