import Card from "@/components/card";
import Loading from "@/components/loading";
import { useBackButton } from "@/hooks/use-back-button";
import { useMainButton } from "@/hooks/use-main-button";
import { trpc } from "@/lib/trpc";
import { WebApp } from "@grammyjs/web-app";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const NewProposal = () => {
  const navigate = useNavigate();
  useBackButton({
    show: true,
    onClick() {
      navigate("/tasker/discover");
    },
  });
  useMainButton({
    show: true,
    onClick() {
      if (note === "") {
        WebApp.showAlert("Please leave a note to the customer.");
      } else {
        createProposalMutation.mutate({
          note,
          taskId,
        });
      }
    },
    text: "Make a proposal",
  });

  const params = useParams();
  const taskId = params["taskId"]!;
  const getTaskQuery = trpc.getTask.useQuery({
    taskId,
  });

  const utils = trpc.useContext();
  const createProposalMutation = trpc.createProposal.useMutation({
    onSuccess() {
      utils.discoverTasks.invalidate();

      navigate("/tasker/proposals", {
        replace: true,
      });
    },
  });

  const [note, setNote] = useState("");

  if (getTaskQuery.isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-4">
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="text-hint">Task</div>
          <Card>
            <div>{getTaskQuery.data?.task.description}</div>
          </Card>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="note" className="text-hint">
            Note
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            id="note"
            name="note"
            rows={5}
            placeholder="Write something to start conversation with the customer."
            className="rounded-md border-none bg-background focus:ring-primary"
          />
        </div>
      </div>
    </div>
  );
};