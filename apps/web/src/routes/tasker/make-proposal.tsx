import Card from "@/components/card";
import MainLayout from "@/components/main-layout";
import { useBackButton } from "@/hooks/use-back-button";
import { useMainButton } from "@/hooks/use-main-button";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const MakeProposal = () => {
  const params = useParams();
  const getTaskQuery = trpc.getTask.useQuery({
    taskId: params["taskId"]!,
  });

  const navigate = useNavigate();

  useBackButton({
    show: true,
    onClick() {
      navigate("/tasker/discover");
    },
  });

  useMainButton({
    show: true,
    onClick() {},
    text: "Make proposal",
  });

  const [note, setNote] = useState("");

  return (
    <MainLayout header="Proposal">
      <div className="space-y-4">
        <Card>
          <div>{getTaskQuery.data?.task.description}</div>
        </Card>
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
    </MainLayout>
  );
};
