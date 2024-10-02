import { Task } from "@/index";
import { toast } from "@/lib/utils";
import { fetcher, useSWRWithParams } from "./util";
import api from "@/lib/api";

interface TasksParams {
  projectId?: string;
  status?: string;
  search?: string;
  priority?: string;
}
const filterTasks = (tasks: Task[], params?: TasksParams) => {
  return tasks.filter(task => {
    if (params?.projectId && task.project !== params.projectId) {
      return false;
    }
    if (params?.status && task.status !== params.status) {
      return false;
    }
    if (params?.priority && task.priority !== params.priority) {
      return false;
    }
    return true;
  });
};
export const useTasks = (params?: TasksParams) => {
  const { data, isLoading, error, mutate } = useSWRWithParams<Task[]>("/tasks");
  const filteredTasks = data ? filterTasks(data, params) : undefined;
  return { tasks: filteredTasks, isLoading, error, mutate };
};

export const createTask = async (task: Task) => {
  try {
    const res = await api.post("/tasks", task);
    toast.success("Task created successfully");
    return res.data;
  } catch (error) {
    toast.error(error);
    throw error;
  }
};

export const updateTask = async (task: Task) => {
  try {
    const res = await api.put(`/tasks/${task._id}`, task);
    toast.success("Task updated successfully");
    return res.data;
  } catch (error) {
    toast.error(error);
    throw error;
  }
};

export const deleteTask = async (taskId: string) => {
  try {
    await api.delete(`/tasks/${taskId}`);
    toast.success("Task deleted successfully");
  } catch (error) {
    toast.error(error);
    throw error;
  }
};
