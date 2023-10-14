import { useBackButton } from "@/hooks/use-back-button";
import { useMainButton } from "@/hooks/use-main-button";
import {
  ChatBubbleBottomCenterIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes";

export const Menu = () => {
  const navigate = useNavigate();
  useBackButton({
    show: false,
  });
  useMainButton({
    show: true,
    onClick() {
      navigate(ROUTES.CUSTOMER.NEW_TASK.path);
    },
    text: "Add new task",
  });

  return (
    <div className="p-4">
      <div className="space-y-2">
        <div className="text-hint">Customer menu</div>
        <div className="flex flex-col gap-2">
          <Link
            to={ROUTES.CUSTOMER.POSTED_TASKS.path}
            className="flex w-full items-center justify-between rounded-md bg-background p-4"
          >
            <span className="flex items-center gap-2">
              <ChatBubbleBottomCenterIcon className="h-5 w-5" />
              Posted tasks
            </span>
            <ChevronRightIcon className="h-5 w-5" />
          </Link>
          <Link
            to={ROUTES.CUSTOMER.ONGOING_TASKS.path}
            className="flex w-full items-center justify-between rounded-md bg-background p-4"
          >
            <span className="flex items-center gap-2">
              <WrenchScrewdriverIcon className="h-5 w-5" />
              Ongoing tasks
            </span>
            <ChevronRightIcon className="h-5 w-5" />
          </Link>
          <Link
            to={ROUTES.CUSTOMER.FINISHED_TASKS.path}
            className="flex w-full items-center justify-between rounded-md bg-background p-4"
          >
            <span className="flex items-center gap-2">
              <CheckCircleIcon className="h-5 w-5" />
              Finished tasks
            </span>
            <ChevronRightIcon className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
