import Card from "@/components/card";
import MainLayout from "@/components/main-layout";
import { WebApp } from "@grammyjs/web-app";
import { SparklesIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";

const DiscoverTasks = () => {
  useEffect(() => {
    WebApp.BackButton.show();

    WebApp.MainButton.hide();
  }, []);

  return (
    <MainLayout header="Discover tasks (1)">
      <div className="space-y-4">
        <Card>
          <div className="text-lg font-semibold">Furniture assembly</div>
          <div className="text-hint">
            There are 2 chairs from IKEA that need to be assembled as soon as
            possible.
          </div>
          <div className="flex gap-2 self-end">
            <button className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-primary-foreground">
              <SparklesIcon className="h-5 w-5" />
              I'm interested
            </button>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default DiscoverTasks;
