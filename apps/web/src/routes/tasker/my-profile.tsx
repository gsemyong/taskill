import MainLayout from "@/components/main-layout";
import { useBackButton } from "@/hooks/use-back-button";
import { useMainButton } from "@/hooks/use-main-button";
import { trpc } from "@/lib/trpc";
import { useNavigate } from "react-router-dom";

export const MyProfile = () => {
  const navigate = useNavigate();

  useBackButton({
    show: true,
    onClick() {
      navigate("/tasker");
    },
  });
  useMainButton({
    show: true,
    onClick() {
      navigate("/tasker/edit-profile");
    },
    text: "Edit",
  });

  const getUserQuery = trpc.getUser.useQuery();

  return (
    <div className="p-4">
      <div className="space-y-2">
        <div className="text-lg font-medium">
          {getUserQuery.data?.user.fullName}
        </div>
        <div className="whitespace-pre-wrap rounded-md bg-background p-4">
          {getUserQuery.data?.user.profile}
        </div>
      </div>
    </div>
  );
};
