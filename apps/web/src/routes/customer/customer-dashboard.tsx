import MainLayout from "@/components/main-layout";
import { WebApp } from "@grammyjs/web-app";
import {
  BriefcaseIcon,
  ChatBubbleBottomCenterIcon,
  ChevronRightIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const CustomerDashobard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    WebApp.BackButton.hide();

    WebApp.MainButton.setText("New task");
    WebApp.MainButton.show();
  }, [navigate]);

  return (
    <MainLayout header="Customer">
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

export default CustomerDashobard;
