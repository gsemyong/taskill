import { useTypedParams } from "react-router-typesafe-routes/dom";
import Card from "@/components/card";
import Loading from "@/components/loading";
import { useBackButton } from "@/hooks/use-back-button";
import { useMainButton } from "@/hooks/use-main-button";
import { trpc } from "@/lib/trpc";
import { WebApp } from "@grammyjs/web-app";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes";

export const Proposal = () => {
  const { proposalId } = useTypedParams(ROUTES.CUSTOMER.PROPOSAL);
  const proposalQuery = trpc.proposals.proposal.useQuery({
    proposalId,
  });

  const deleteProposalMutation = trpc.proposals.delete.useMutation({
    onSuccess() {
      navigate(-1);
    },
  });
  const acceptProposalMutation = trpc.proposals.accept.useMutation({
    onSuccess() {
      navigate(ROUTES.CUSTOMER.ONGOING_TASKS.path);
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
    show: !proposalQuery.isLoading,
    onClick() {
      document.getElementById("chat")?.click();
    },
    text: "Chat",
  });

  if (proposalQuery.isLoading) {
    return <Loading />;
  }

  if (!proposalQuery.data) {
    return null;
  }

  return (
    <div className="p-4">
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="font-medium text-hint">Task</div>
          <Card>{proposalQuery.data.proposal.task.description}</Card>
        </div>
        <div className="space-y-2">
          <div className="font-medium text-hint">Note</div>
          <Card>
            <div>{proposalQuery.data.proposal.note}</div>
            <Link
              className="text-link"
              to={ROUTES.CUSTOMER.TASKER_PROFILE.buildPath({
                taskerId: proposalQuery.data.proposal.tasker.id,
              })}
            >
              {proposalQuery.data.proposal.tasker.fullName}
            </Link>
          </Card>
        </div>
        <div className="space-y-2">
          <div className="font-medium text-hint">
            Give the task to the tasker?
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                WebApp.showConfirm(
                  "Are you sure you want to accept this proposal?",
                  (ok) => {
                    if (ok) {
                      acceptProposalMutation.mutate({
                        proposalId,
                      });
                    }
                  },
                );
              }}
              className="flex w-full items-center justify-center gap-2 rounded-md bg-primary py-2 text-center text-primary-foreground"
            >
              <CheckIcon className="h-5 w-5" />
            </button>
            <button
              onClick={() => {
                WebApp.showConfirm(
                  "Are you sure you want to decline this proposal?",
                  (ok) => {
                    if (ok) {
                      deleteProposalMutation.mutate({
                        proposalId,
                      });
                    }
                  },
                );
              }}
              className="flex w-full items-center justify-center gap-2 rounded-md bg-rose-500 py-2 text-center text-primary-foreground"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      <a
        className="hidden"
        id="chat"
        href={`http://t.me/${proposalQuery.data.proposal.taskerUsername}/`}
      />
    </div>
  );
};
