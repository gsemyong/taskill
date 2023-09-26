import { trpc } from "@/lib/trpc";

const ManageTasks = () => {
  const tasksQuery = trpc.tasks.useQuery();

  if (tasksQuery.isLoading) {
    return null;
  }

  return tasksQuery.data?.tasks.map((task, index) => (
    <div key={index}>{task.description}</div>
  ));
};

export default ManageTasks;
