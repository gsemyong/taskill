import Card from "@/components/card";
import MainLayout from "@/components/main-layout";
import { WebApp } from "@grammyjs/web-app";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export const PostedTasks = () => {
  const navigate = useNavigate();

  useEffect(() => {
    WebApp.BackButton.show();

    WebApp.MainButton.setText("New task");
    WebApp.MainButton.show();
  }, [navigate]);

  return (
    <MainLayout header="Posted tasks (1)">
      <div className="space-y-4">
        <Card>
          <div className="text-lg font-semibold">Furniture assembly</div>
          <div className="text-hint">
            There are 2 chairs from IKEA that need to be assembled as soon as
            possible.
          </div>
          <Link
            to="/customer/interested/1"
            className="flex items-center justify-between rounded-md bg-secondary-background p-4"
          >
            7 taskers interested
            <ChevronRightIcon className="h-5 w-5" />
          </Link>
        </Card>
      </div>
    </MainLayout>
  );
};
