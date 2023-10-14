import Card from "@/components/card";
import Loading from "@/components/loading";
import { useBackButton } from "@/hooks/use-back-button";
import { useMainButton } from "@/hooks/use-main-button";
import { trpc } from "@/lib/trpc";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes";

export const Proposals = () => {
  const navigate = useNavigate();
  useBackButton({
    show: true,
    onClick() {
      navigate(ROUTES.TASKER.MENU.path);
    },
  });
  useMainButton({
    show: false,
  });

  const getTaskerProposals = trpc.getTaskerProposals.useQuery();

  if (getTaskerProposals.isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-4">
      {getTaskerProposals.data?.proposals.length === 0 ? (
        <div className="text-hint">You have no active proposals</div>
      ) : (
        <div className="space-y-2">
          <div className="text-hint">Proposals</div>
          <div className="flex flex-col gap-2">
            {getTaskerProposals.data?.proposals.map((proposal) => (
              <Link
                to={ROUTES.TASKER.PROPOSAL.buildPath({
                  proposalId: proposal.id,
                })}
              >
                <Card key={proposal.id}>
                  <div className="space-y-1">
                    <div className="text-hint">Task</div>
                    <div>{proposal.task.description}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-hint">Note</div>
                    <div>{proposal.note}</div>
                    <div className="italic text-hint"></div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
