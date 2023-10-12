import Card from "@/components/card";
import Loading from "@/components/loading";
import { useBackButton } from "@/hooks/use-back-button";
import { useMainButton } from "@/hooks/use-main-button";
import { trpc } from "@/lib/trpc";
import { WebApp } from "@grammyjs/web-app";
import { useNavigate, useParams } from "react-router-dom";

export const Proposal = () => {
  const params = useParams();
  const proposalId = params["proposalId"]!;
  const getProposalQuery = trpc.getProposal.useQuery({
    proposalId,
  });

  const deleteProposalMutation = trpc.deleteProposal.useMutation({
    onSuccess() {
      navigate(-1);
    },
  });

  const navigate = useNavigate();
  useBackButton({
    show: true,
    onClick() {
      navigate(-1);
    },
  });

  useMainButton({
    show: false,
  });

  if (getProposalQuery.isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-4">
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="text-hint">Task</div>
          <Card>{getProposalQuery.data?.proposal.task.description}</Card>
        </div>
        <div className="space-y-2">
          <div className="text-hint">Note</div>
          <Card>{getProposalQuery.data?.proposal.note}</Card>
        </div>
        <div className="space-y-2">
          <div className="text-hint">Actions</div>
          <button
            onClick={() => {
              WebApp.showConfirm(
                "Are you sure you want to delete this proposal?",
                (ok) => {
                  if (ok) {
                    deleteProposalMutation.mutate({
                      proposalId,
                    });
                  }
                },
              );
            }}
            className="w-full rounded-md bg-red-500 py-2 text-primary-foreground"
          >
            Delete proposal
          </button>
        </div>
      </div>
    </div>
  );
};
