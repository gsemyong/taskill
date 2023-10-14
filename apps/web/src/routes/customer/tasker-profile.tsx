import Card from "@/components/card";
import Loading from "@/components/loading";
import { useBackButton } from "@/hooks/use-back-button";
import { useMainButton } from "@/hooks/use-main-button";
import { trpc } from "@/lib/trpc";
import { useNavigate, useParams } from "react-router-dom";

export const TaskerProfile = () => {
  const params = useParams();
  const taskerId = parseInt(params["taskerId"]!);
  const getTaskerQuery = trpc.getTasker.useQuery({
    taskerId,
  });

  const navigate = useNavigate();
  useBackButton({
    show: true,
    onClick() {
      navigate(-1);
    },
  });
  useMainButton({
    show: !getTaskerQuery.isLoading,
    onClick() {
      document.getElementById("chat")?.click();
    },
    text: "Chat",
  });

  if (getTaskerQuery.isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-4">
      <div className="space-y-4">
        <div className="text-lg font-medium">
          {getTaskerQuery.data?.tasker.fullName}
        </div>
        <div className="space-y-2">
          <div className="text-hint">Profile</div>
          <Card>
            <div className="whitespace-pre-wrap">
              {getTaskerQuery.data?.tasker.profile}
            </div>
          </Card>
        </div>
        {/* <div className="space-y-2">
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
        </div> */}
      </div>
      <a className="hidden" id="chat" href="http://t.me/gsemyong/" />
    </div>
  );
};
