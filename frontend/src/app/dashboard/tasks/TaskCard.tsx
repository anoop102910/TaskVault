import { DotsVerticalIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Dropdown } from "@/components/ui/dropdown-menu";
import { PencilIcon, TrashIcon } from "lucide-react";
import { DialogForm } from "@/components/ui/dialog";
import AddNewTaskForm from "./TaskForm";
import { DeleteAlert } from "@/components/ui/alert-dialog";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { AvatarGroup } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Task } from "@/index";
import PriorityBadge from "./PriorityBadge";
import { cn } from "@/lib/utils";
import { toast } from "@/lib/utils";
import api from "@/lib/api";
import { useSWRConfig } from "swr";
interface TaskCardProps {
  task: Task;
  index: number;
}

const TaskCard = ({ task, index }: TaskCardProps) => {
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const { priority, title, desc, dueDate, subTasks, assignedTo } = task;
  const { mutate } = useSWRConfig();

  const handleTaskDelete = async () => {
    setPending(true);
    try {
      await api.delete(`/tasks/${task._id}`);
      mutate("/tasks");
      toast.success("Task deleted successfully");
    } catch (error) {
      toast.error("Failed to delete task");
    } finally {
      setPending(false);
    }
  };

  return (
    <div className={cn("rounded-xl border p-4 dark:bg-gray-800", "dark:text-white bg-white ")}>
      <div className="flex justify-between items-center mb-2 ">
        <PriorityBadge priority={priority} />
        <Dropdown
          items={[
            {
              label: "Edit",
              renderItem: () => (
                <>
                  <div className="flex items-center gap-2">
                    <PencilIcon className="w-4 h-4" />
                    Edit
                  </div>
                </>
              ),
              icon: <PencilIcon className="w-4 h-4" />,
              onClick: () => setIsEditDialogOpen(true),
            },
            {
              label: "Delete",
              renderItem: () => (
                <>
                  <TrashIcon className="w-4 h-4" />
                  Delete
                </>
              ),
              icon: <TrashIcon className="w-4 h-4" />,
              onClick: () => setIsDeleteAlertOpen(true),
            },
          ]}
        >
          <DotsVerticalIcon className="w-4 h-4" />
        </Dropdown>
      </div>
      <h3 className="text-semibold ">{title}</h3>
      <span className="text-xs text-slate-700 dark:text-slate-300 mb-4 block">
        Due Date: {new Date(dueDate).toLocaleDateString()}
      </span>
      <p className="text-sm text-slate-700 dark:text-slate-300">{desc}</p>
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-2 border p-1 rounded-md mt-3 text-sm">
          <HamburgerMenuIcon className="w-4 h-4 text-gray-500" />
          <span className="text-gray-500">
            {" "}
            {subTasks.filter(subTask => subTask.status === "Done").length} / {subTasks.length}
          </span>
        </span>
      </div>
      <Separator className="my-4" />
      <div className="flex items-center justify-between gap-4 ">
        <Progress
          value={
            (subTasks.filter(subTask => subTask.status === "Done").length / subTasks.length) * 100
          }
        />
        <AvatarGroup users={assignedTo.slice(0, 5)} />
      </div>

      <>
        <DialogForm open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <AddNewTaskForm task={task} isUpdate={true} setIsOpen={setIsEditDialogOpen} />
        </DialogForm>
        <DeleteAlert
          title="Delete Task"
          desc="Are you sure you want to delete this task?"
          onDelete={handleTaskDelete}
          onCancel={() => {}}
          open={isDeleteAlertOpen}
          setOpen={setIsDeleteAlertOpen}
          pending={pending}
        />
      </>
    </div>
  );
};

export default TaskCard;
