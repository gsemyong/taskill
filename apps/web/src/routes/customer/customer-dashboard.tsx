import MainLayout from "@/components/main-layout";
import { useBackButton } from "@/hooks/use-back-button";
import { useMainButton } from "@/hooks/use-main-button";
import {
  BriefcaseIcon,
  ChatBubbleBottomCenterIcon,
  ChevronRightIcon,
  PlusIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export const CustomerDashobard = () => {
  useBackButton(false);
  useMainButton({
    show: false,
  });

  return (
    <MainLayout
      header="Customer"
      action={
        <Link
          to="/customer/new"
          className="text-md flex items-center justify-center gap-2 rounded-lg bg-primary p-2 font-medium text-primary-foreground"
        >
          <PlusIcon className="h-5 w-5" />
          New task
        </Link>
      }
    >
      <div className="space-y-4">
        <Link
          to="/customer/posted"
          className="flex w-full items-center justify-between rounded-md bg-background p-4"
        >
          <span className="flex items-center gap-2">
            <ChatBubbleBottomCenterIcon className="h-5 w-5" />
            Posted tasks (1)
          </span>
          <ChevronRightIcon className="h-5 w-5" />
        </Link>
        <Link
          to="/customer/proposals"
          className="flex w-full items-center justify-between rounded-md bg-background p-4"
        >
          <span className="flex items-center gap-2">
            <BriefcaseIcon className="h-5 w-5" />
            Proposals from taskers (1)
          </span>
          <ChevronRightIcon className="h-5 w-5" />
        </Link>
        <Link
          to="/customer/ongoing"
          className="flex w-full items-center justify-between rounded-md bg-background p-4"
        >
          <span className="flex items-center gap-2">
            <WrenchScrewdriverIcon className="h-5 w-5" />
            Ongoing tasks (1)
          </span>
          <ChevronRightIcon className="h-5 w-5" />
        </Link>
      </div>
    </MainLayout>
  );
};
