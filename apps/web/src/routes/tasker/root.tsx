import { trpc } from "@/lib/trpc";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ROUTES } from "..";

export const Root = () => {
  const navigate = useNavigate();

  const getUserQuery = trpc.getUser.useQuery();

  useEffect(() => {
    if (
      getUserQuery.data?.user &&
      (!getUserQuery.data.user.fullName || !getUserQuery.data.user.profile)
    ) {
      navigate(ROUTES.TASKER.ONBOARDING.path);
    }
  }, [getUserQuery.data, navigate]);

  return <Outlet />;
};
