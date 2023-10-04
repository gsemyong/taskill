import Card from "@/components/card";
import MainLayout from "@/components/main-layout";
import { WebApp } from "@grammyjs/web-app";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const InterestedTaskers = () => {
  useEffect(() => {
    WebApp.MainButton.hide();
  }, []);

  return (
    <MainLayout header="Interested taskers (1)" subHeader="Furniture assembly">
      <div className="space-y-4">
        <Link to="/customer/tasker/1">
          <Card>
            <div className="text-lg font-semibold">John Doe</div>
            <div className="text-hint">
              I can do this task for you. I have done this before many times
              with 100% success rate. I can start today. The whole task will
              take 2 hours.
            </div>
            <div className="flex gap-2 self-end">
              <button className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-primary-foreground">
                <ChatBubbleBottomCenterTextIcon className="h-5 w-5" />
                Chat
              </button>
            </div>
          </Card>
        </Link>
      </div>
    </MainLayout>
  );
};

export default InterestedTaskers;
