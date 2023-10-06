import MainLayout from "@/components/main-layout";
import { useBackButton } from "@/hooks/use-back-button";
import { trpc } from "@/lib/trpc";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export const MyProfile = () => {
  useBackButton(true);

  const getUserQuery = trpc.getUser.useQuery();

  return (
    <MainLayout
      header="Profile"
      action={
        <Link
          to="/tasker/edit-profile"
          className="text-md flex items-center justify-center gap-2 rounded-lg bg-primary p-2 px-4 font-medium text-primary-foreground"
        >
          <PencilSquareIcon className="h-5 w-5" />
          Edit
        </Link>
      }
    >
      <div className="space-y-4">
        <div className="text-lg font-medium text-hint">
          {getUserQuery.data?.user.fullName}
        </div>
        <div className="whitespace-pre-wrap rounded-md bg-background p-4">
          {getUserQuery.data?.user.profile}
        </div>
      </div>
    </MainLayout>
  );
};
