"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusIcon, MinusIcon } from "@radix-ui/react-icons";
import { useState, useEffect } from "react";
import { User } from "@/index";
import SelectUser from "@/components/shared/SelectUser";
import { TASK_PRIORITY, TASK_STATUS } from "@/constant";
import { DatePicker } from "@/components/ui/date-picker";
import { useProjects } from "@/lib/services/project";
import api from "@/lib/api";
import { toast } from "@/lib/utils";
import { useFilter } from "./useFilter";
import { useSWRConfig } from "swr";
import { Task } from "@/index";
import SelectPriority from "./SelectPriority";
import SelectStatus from "./SelectStatus";

interface AddNewTaskFormProps {
  isUpdate: boolean;
  setIsOpen: (isOpen: boolean) => void;
  task?: Task;
  status?: string;
}
interface FormData {
  title: string;
  desc: string;
  subTasks: {
    title: string;
    desc: string;
    priority: string;
    status?: string;
    dueDate?: Date;
  }[];
  assignedTo: string[];
  priority: string;
  status?: string;
  dueDate: Date;
  project?: string;
}

const AddNewTaskForm: React.FC<AddNewTaskFormProps> = ({ isUpdate, setIsOpen, task, status }) => {
  const initialFormData: FormData = {
    title: "",
    desc: "",
    subTasks: [],
    assignedTo: [],
    priority: TASK_PRIORITY.NORMAL,
    status: status || TASK_STATUS.TO_DO,
    dueDate: new Date(),
  };
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [pending, setPending] = useState<boolean>(false);
  const { projectId } = useFilter();
  const { projects, isLoading: isProjectLoading } = useProjects({ _id: projectId || "" });
  const project = projects?.[0];
  const members = project?.members;
  const { mutate } = useSWRConfig();

  useEffect(() => {
    console.log(isUpdate, task);
    if (isUpdate && task) {
      setFormData({
        title: task.title!,
        desc: task.desc!,
        priority: task.priority!,
        status: task.status!,
        dueDate: task.dueDate!,
        assignedTo: task.assignedTo.map(user => user._id)!,
        subTasks: task.subTasks.map(subTask => ({
          title: subTask.title!,
          desc: subTask.desc!,
          priority: subTask.priority!,
          status: subTask.status!,
        })),
        project: task.project,
      });
    }
  }, [isUpdate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubTaskChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const field = name.includes("Title") ? "title" : "desc";

    setFormData({
      ...formData,
      subTasks: formData.subTasks.map((subTask, i) =>
        i === index ? { ...subTask, [field]: value } : subTask
      ),
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    try {
      if (isUpdate) {
        await api.put(`task/${task?._id}`, formData);
        mutate("/tasks");
      } else {
        formData.project = projectId;
        await api.post("/tasks", formData);
        toast.success("Task created ");
        mutate("/tasks");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to create task");
    } finally {
      setPending(false);
    }
  };

  const handleAddSubTask = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFormData({
      ...formData,
      subTasks: [
        ...formData.subTasks,
        {
          title: "",
          desc: "",
          priority: TASK_PRIORITY.NORMAL,
        },
      ],
    });
  };

  const handleRemoveSubTask = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
    e.preventDefault();
    setFormData({
      ...formData,
      subTasks: formData.subTasks.filter((_, i) => i !== index),
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
        <div>
          <Label htmlFor="title">Task Title</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter task title"
          />
        </div>
        <div>
          <Label htmlFor="desc">Task Description</Label>
          <Textarea
            id="desc"
            name="desc"
            value={formData.desc}
            onChange={handleChange}
            placeholder="Enter task description"
          />
        </div>
        <div>
          <Label htmlFor="priority">Priority</Label>
          <SelectPriority
            className="w-full"
            priority={formData.priority}
            onPriorityChange={val => setFormData({ ...formData, priority: val })}
          />
        </div>
        <div>
          <Label htmlFor="assignedTo">Assigned To</Label>
          <SelectUser
            users={members}
            selectedUsers={formData.assignedTo}
            onSelectUser={selUsers => setFormData({ ...formData, assignedTo: selUsers })}
          />
        </div>
        {isUpdate && (
          <div>
            <Label htmlFor="status">Status</Label>
            <SelectStatus
              status={formData.status || ""}
              onStatusChange={val => setFormData({ ...formData, status: val })}
              className="w-full"
            />
          </div>
        )}
        <div>
          <Label htmlFor="dueDate">Due Date</Label>
          <DatePicker
            className="w-full"
            date={formData.dueDate}
            onDateChange={date => setFormData({ ...formData, dueDate: date })}
          />
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-lg font-semibold uppercase">Subtasks</span>
          <Button onClick={handleAddSubTask} size={"icon"}>
            <PlusIcon className="w-4 h-4" />
          </Button>
        </div>
        {formData.subTasks.map((subTask, index) => (
          <div key={index} className="flex gap-x-2">
            <div className="flex flex-col gap-y-4 w-full">
              <div>
                <Label htmlFor="subTask">Subtask</Label>
                <Input
                  id={`subTaskTitle-${index}`}
                  name={`subTaskTitle-${index}`}
                  value={subTask.title}
                  onChange={e => handleSubTaskChange(e, index)}
                  placeholder="Enter subtask"
                />
              </div>
              <div>
                <Label htmlFor="subTaskDesc">Subtask Description</Label>
                <Textarea
                  id={`subTaskDesc-${index}`}
                  name={`subTaskDesc-${index}`}
                  value={subTask.desc}
                  onChange={e => handleSubTaskChange(e, index)}
                  placeholder="Enter subtask description"
                />
              </div>
              <div>
                <Label htmlFor="subTaskPriority">Subtask Priority</Label>
                <SelectPriority
                  priority={subTask.priority}
                  className="w-full"
                  onPriorityChange={val =>
                    setFormData({
                      ...formData,
                      subTasks: formData.subTasks.map((subTask, i) =>
                        i === index ? { ...subTask, priority: val } : subTask
                      ),
                    })
                  }
                />
              </div>
            </div>
            <Button className="mt-6" onClick={e => handleRemoveSubTask(e, index)} size={"icon"}>
              <MinusIcon className="w-4 h-4" />
            </Button>
          </div>
        ))}

        <Button type="submit" className="mt-4 w-full" pending={pending}>
          Add Task
        </Button>
      </form>
    </div>
  );
};

export default AddNewTaskForm;
