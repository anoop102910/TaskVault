"use client";
import Navbar from "./Navbar";
import TaskListView from "./TaskListView";
import { useTaskLayout } from "./useTaskLayout";
import TaskTableView from "./TaskTableView";
import { useTasks } from "@/lib/services/task";
import { useFilter } from "./useFilter";
import { TASK_STATUS } from "@/constant";
import TaskCardSkeleton from "./TaskCardSkeleton";
import TableSkeleton from "@/components/shared/TableSkeleton";
import Error from "@/components/shared/Error";

const TaskPage = () => {
  const { projectId, status, priority } = useFilter();
  const { tasks, isLoading, error } = useTasks({ projectId, status, priority });
  const { layout } = useTaskLayout();
  if (isLoading) return layout === "list" ? <TaskListSkeleton /> : <TaskTableViewSkeleton />;
  if (error) return <Error />;
  if (!tasks) return <TaskEmpty />;

  return (
    <div>
      {layout == "list" ? <TaskListView tasks={tasks!} /> : <TaskTableView tasks={tasks!} />}
    </div>
  );
};
const TaskListSkeleton = () => {
  return (
    <div className="flex justify-between gap-6 flex-1 p-6 dark:bg-slate-700">
      {Object.values(TASK_STATUS).map((status, index) => (
        <div key={index} className="bg-gray-100 flex-1 dark:bg-slate-700">
          <TaskCardSkeleton />
        </div>
      ))}
    </div>
  );
};

const TaskTableViewSkeleton = () => {
  return <TableSkeleton rows={4} cols={4} />;
};

const TaskEmpty = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] border border-dashed p-4">
      <div className="text-gray-500">No tasks found</div>
    </div>
  );
};

export default TaskPage;
