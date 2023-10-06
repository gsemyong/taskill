import Card from "@/components/card";
import MainLayout from "@/components/main-layout";
import { WebApp } from "@grammyjs/web-app";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export const Proposals = () => {
  useEffect(() => {
    WebApp.BackButton.show();

    WebApp.MainButton.hide();
  }, []);

  return (
    <MainLayout header="Proposals from taskers (1)">
      <div className="space-y-4">
        <Card>
          <div className="text-lg font-semibold">House cleaning</div>
          <div className="text-hint">
            Clean all the house after renovation. The house is 100 square
            meters. The cleaning should be done on 1st of May.
          </div>
          <Link
            to="/customer/tasker/1"
            className="space-y-2 rounded-md bg-secondary-background p-4"
          >
            <div className="text-lg font-semibold">John Doe</div>
            <div className="text-hint">
              I'm ready to do this task for you. The price is 100 euro, the
              duration is 2 hours.
            </div>
          </Link>
          <div className="flex gap-2 self-end">
            <button className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-primary-foreground">
              Accept
            </button>
            <button className="flex items-center gap-2 rounded-md bg-rose-600 px-4 py-2 text-white">
              Decline
            </button>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};
