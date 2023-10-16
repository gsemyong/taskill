import { useBackButton } from "@/hooks/use-back-button";
import { useMainButton } from "@/hooks/use-main-button";
import { trpc } from "@/lib/trpc";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes";
import Loading from "@/components/loading";

export const Profile = () => {
  const navigate = useNavigate();
  useBackButton({
    show: true,
    onClick() {
      navigate(ROUTES.TASKER.MENU.path);
    },
  });
  useMainButton({
    show: true,
    onClick() {
      navigate(ROUTES.TASKER.EDIT_PROFILE.path);
    },
    text: "Edit",
  });

  const userQuery = trpc.users.user.useQuery();

  if (userQuery.isLoading) {
    return <Loading />;
  }

  if (!userQuery.data) {
    return null;
  }

  return (
    <div className="p-4">
      <div className="space-y-2">
        <div className="text-lg font-medium">
          {userQuery.data.user.fullName}
        </div>
        <div className="whitespace-pre-wrap rounded-md bg-background p-4">
          {userQuery.data.user.profile}
        </div>
      </div>
    </div>
  );
};
