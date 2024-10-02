import { Dropdown } from "@/components/ui/dropdown-menu";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import TaskCard from "./TaskCard";
import { CircleIcon, PlusIcon, CopyIcon } from "lucide-react";
import { Task } from "@/index";
import { useState } from "react";
import AddNewTaskForm from "./TaskForm";
import { DialogForm } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TASK_STATUS, TASK_STATUS_COLORS_LIGHT } from "@/constant";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/context/AuthProvider";

interface TaskListViewProps {
  tasks: Task[];
}

const TaskListView = ({ tasks }: TaskListViewProps) => {
  const { user } = useAuth();
  return (
    <div className="flex justify-between gap-6 flex-1 p-6 dark:bg-slate-700 min-w-[1080px] min-h-screen ">
      {Object.values(TASK_STATUS).map((status, index) => (
        <div key={index} className="bg-gray-100 flex-1 dark:bg-slate-700">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-x-2">
              <CircleIcon
                className={cn("w-3 h-3")}
                fill={TASK_STATUS_COLORS_LIGHT[status]}
                color={TASK_STATUS_COLORS_LIGHT[status]}
              />
              <span className="text-semibold text-gray-800 dark:text-white">{status}</span>
              <span className="text-xs bg-white px-4 py-1 rounded-full dark:bg-slate-800 dark:text-white dark:border">
                {tasks.filter(task => task.status === status).length}
              </span>
            </div>
            <Dropdown
              items={[
                {
                  label: "Duplicate",
                  icon: <CopyIcon className="w-4 h-4" />,
                  onClick: () => console.log("Duplicate"),
                },
              ]}
            >
              <DotsVerticalIcon />
            </Dropdown>
          </div>
          {user.role === "manager" && (
            <div className="mb-2">
              <AddNewTaskDialog status={status} />
            </div>
          )}
          <div className="space-y-2">
            {tasks
              .filter((task: Task) => task.status === status)
              .map((task: Task, taskIndex: number) => (
                <TaskCard key={taskIndex} task={task} index={taskIndex} />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const AddNewTaskDialog = ({ status }: { status: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <DialogForm
      className="w-[800px]"
      open={isOpen}
      onOpenChange={setIsOpen}
      title="Add New Task"
      desc="Add a new task to the board"
      trigger={
        <Button className="w-full" size={"sm"}>
          <PlusIcon className="w-4 h-4 mr-2" />
          Add New Task
        </Button>
      }
    >
      <AddNewTaskForm isUpdate={false} setIsOpen={setIsOpen} status={status} />
    </DialogForm>
  );
};

export default TaskListView;
