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
import { Card } from "@radix-ui/themes";

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
      <div className="mb-6 space-y-2">
        <h4>Customer menu</h4>
        <p className="text-mauve-900">Add and manage tasks</p>
      </div>
      <div className="flex flex-col gap-3">
        <Link to={ROUTES.CUSTOMER.POSTED_TASKS.path}>
          <Card>
            <div className="flex items-center justify-between p-2">
              <span className="flex items-center gap-3">
                <ChatBubbleBottomCenterIcon className="h-5 w-5" />
                Posted tasks
              </span>
              <ChevronRightIcon className="h-5 w-5" />
            </div>
          </Card>
        </Link>
        <Link to={ROUTES.CUSTOMER.ONGOING_TASKS.path}>
          <Card>
            <div className="flex items-center justify-between p-2">
              <span className="flex items-center gap-3">
                <WrenchScrewdriverIcon className="h-5 w-5" />
                Ongoing tasks
              </span>
              <ChevronRightIcon className="h-5 w-5" />
            </div>
          </Card>
        </Link>
        <Link to={ROUTES.CUSTOMER.FINISHED_TASKS.path}>
          <Card>
            <div className="flex items-center justify-between p-2">
              <span className="flex items-center gap-3">
                <CheckCircleIcon className="h-5 w-5" />
                Finished tasks
              </span>
              <ChevronRightIcon className="h-5 w-5" />
            </div>
          </Card>
        </Link>
      </div>
    </div>
  );
};
