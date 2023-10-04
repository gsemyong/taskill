import Card from "@/components/card";
import MainLayout from "@/components/main-layout";
import { WebApp } from "@grammyjs/web-app";
import { BriefcaseIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const InterestingTasks = () => {
  const navigate = useNavigate();

  useEffect(() => {
    WebApp.BackButton.show();

    WebApp.MainButton.hide();
  }, []);

  return (
    <MainLayout header="Interesting tasks (2)">
      <div className="space-y-4">
        <Card>
          <div className="text-lg font-semibold">Furniture assembly</div>
          <div className="text-hint">
            There are 2 chairs from IKEA that need to be assembled as soon as
            possible.
          </div>
          <div className="flex gap-2 self-end">
            <button
              onClick={() => {
                WebApp.showConfirm(
                  "Please make sure you've discussed the details of the task with the customer before making a proposal. Do you want to continue?",
                  (ok) => {
                    if (ok) {
                      navigate("/tasker/ongoing");
                    }
                  },
                );
              }}
              className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-primary-foreground"
            >
              <BriefcaseIcon className="h-5 w-5" />
              Make a proposal
            </button>
          </div>
        </Card>
        <Card>
          <div className="text-lg font-semibold">Kitchen cleaning</div>
          <div className="text-hint">
            My kitchen has been dirty for a while and I need someone to clean
            it.
          </div>
          <div className="italic text-hint">
            Wait for the customer to reach out to you and discuss the details.
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default InterestingTasks;
