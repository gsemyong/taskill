import { trpc } from "@/lib/trpc";

const ManageTasks = () => {
  const tasksQuery = trpc.tasks.useQuery();

  if (tasksQuery.isLoading) {
    return null;
  }

  if (tasksQuery.data?.tasks.length === 0) {
    return <div className="flex items-center justify-center p-4">No tasks</div>;
  }

  return <div>hello</div>;
};

export default ManageTasks;
