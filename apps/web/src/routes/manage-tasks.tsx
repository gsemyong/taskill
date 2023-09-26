import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { TrashIcon } from "@radix-ui/react-icons";

const ManageTasks = () => {
  const utils = trpc.useContext();
  const tasksQuery = trpc.tasks.useQuery();
  const deleteTaskMutation = trpc.deleteTask.useMutation({
    onSuccess: async () => {
      await utils.tasks.invalidate();
    },
  });

  if (tasksQuery.isLoading) {
    return null;
  }

  if (tasksQuery.data?.tasks.length === 0) {
    return <div className="flex items-center justify-center p-4">No tasks</div>;
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      {tasksQuery.data?.tasks.map((task, index) => (
        <div
          className="flex w-full items-center justify-between gap-2 rounded-md border p-4"
          key={index}
        >
          <div className="line-clamp-1">{task.description}</div>
          <div>
            <Button
              onClick={() =>
                deleteTaskMutation.mutate({
                  taskId: task.id,
                })
              }
              variant="destructive"
              size="icon"
            >
              <TrashIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ManageTasks;
