import { useBackButton } from "@/hooks/use-back-button";
import { useMainButton } from "@/hooks/use-main-button";
import {
  ChevronRightIcon,
  WrenchScrewdriverIcon,
  UserCircleIcon,
  BriefcaseIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";

export const TaskerDashboard = () => {
  useBackButton({
    show: false,
  });

  const navigate = useNavigate();

  useMainButton({
    show: true,
    onClick() {
      navigate("/tasker/discover");
    },
    text: "Discover tasks",
  });

  return (
    <div className="p-4">
      <div className="space-y-2">
        <div className="text-hint">Tasker menu</div>
        <Link
          to="/tasker/proposals"
          className="flex w-full items-center justify-between rounded-md bg-background p-4"
        >
          <span className="flex items-center gap-2">
            <BriefcaseIcon className="h-5 w-5" />
            Proposals
          </span>
          <ChevronRightIcon className="h-5 w-5" />
        </Link>
        <Link
          to="/tasker/ongoing"
          className="flex w-full items-center justify-between rounded-md bg-background p-4"
        >
          <span className="flex items-center gap-2">
            <WrenchScrewdriverIcon className="h-5 w-5" />
            Ongoing tasks
          </span>
          <ChevronRightIcon className="h-5 w-5" />
        </Link>
        <Link
          to="/tasker/finished"
          className="flex w-full items-center justify-between rounded-md bg-background p-4"
        >
          <span className="flex items-center gap-2">
            <CheckCircleIcon className="h-5 w-5" />
            Finished tasks
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
    </div>
  );
};
