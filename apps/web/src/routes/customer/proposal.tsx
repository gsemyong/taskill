import Card from "@/components/card";
import Loading from "@/components/loading";
import { useBackButton } from "@/hooks/use-back-button";
import { useMainButton } from "@/hooks/use-main-button";
import { trpc } from "@/lib/trpc";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate, useParams } from "react-router-dom";

export const Proposal = () => {
  const params = useParams();
  const proposalId = params["proposalId"]!;
  const proposalQuery = trpc.getProposal.useQuery({
    proposalId,
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
      document.getElementById("chatWithTasker")?.click();
    },
    text: "Chat with tasker",
  });

  if (proposalQuery.isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-4">
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="font-medium text-hint">Task</div>
          <Card>{proposalQuery.data?.proposal.task.description}</Card>
        </div>
        <div className="space-y-2">
          <div className="font-medium text-hint">Note</div>
          <Card>
            <div>{proposalQuery.data?.proposal.note}</div>
            <Link
              className="text-link"
              to={`/tasker/${proposalQuery.data?.proposal.tasker.id}`}
            >
              {proposalQuery.data?.proposal.tasker.fullName}
            </Link>
          </Card>
        </div>
        <div className="space-y-2">
          <div className="font-medium text-hint">
            Give the task to the tasker?
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {}}
              className="flex w-full items-center justify-center gap-2 rounded-md bg-primary py-2 text-center text-primary-foreground"
            >
              <CheckIcon className="h-5 w-5" />
            </button>
            <button
              onClick={() => {}}
              className="flex w-full items-center justify-center gap-2 rounded-md bg-rose-500 py-2 text-center text-primary-foreground"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      <a
        className="hidden"
        id="chatWithTasker"
        href="http://t.me/gsemyong/"
      ></a>
    </div>
  );
};
