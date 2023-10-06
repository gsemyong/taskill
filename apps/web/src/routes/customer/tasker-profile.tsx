import Card from "@/components/card";
import MainLayout from "@/components/main-layout";
import { WebApp } from "@grammyjs/web-app";
import { StarIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";

export const TaskerProfile = () => {
  useEffect(() => {
    WebApp.MainButton.setText("Chat");
    WebApp.MainButton.show();
  }, []);

  return (
    <MainLayout header="John Doe">
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="text-hint">Profile</div>
          <Card>
            I am qualified construction worker with 10 years of experience. I
            also am capable of assembling furniture. My prices are fair and I am
            always on time.
          </Card>
        </div>
        <div className="space-y-2">
          <div className="text-hint">Reviews</div>
          <Card>
            <div className="flex gap-1">
              <StarIcon className="h-5 w-5 fill-primary text-primary" />
              <StarIcon className="h-5 w-5 fill-primary text-primary" />
              <StarIcon className="h-5 w-5 fill-primary text-primary" />
              <StarIcon className="h-5 w-5 fill-primary text-primary" />
              <StarIcon className="h-5 w-5 text-primary" />
            </div>
            John was on time, but the speed of his work was not as fast as I
            expected. The price was fair.
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};
