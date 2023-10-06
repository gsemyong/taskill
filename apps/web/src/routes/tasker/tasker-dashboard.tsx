import MainLayout from "@/components/main-layout";
import { WebApp } from "@grammyjs/web-app";
import {
  ChevronRightIcon,
  WrenchScrewdriverIcon,
  UserCircleIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export const TaskerDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    WebApp.BackButton.hide();

    WebApp.MainButton.setText("Discover tasks");
    WebApp.MainButton.show();
  }, [navigate]);

  return (
    <MainLayout header="Tasker">
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
