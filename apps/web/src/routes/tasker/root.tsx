import { trpc } from "@/lib/trpc";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes";
import Loading from "@/components/loading";

export const Root = () => {
  const navigate = useNavigate();

  const userQuery = trpc.users.user.useQuery();

  useEffect(() => {
    if (
      userQuery.data?.user &&
      (!userQuery.data.user.fullName || !userQuery.data.user.profile)
    ) {
      navigate(ROUTES.TASKER.ONBOARDING.path);
    }
  }, [userQuery.data, navigate]);

  if (userQuery.isLoading) {
    return <Loading />;
  }

  return <Outlet />;
};
