import { Task, SubTask } from "@/index";
import { CornerDownRight } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import PriorityBadge from "./PriorityBadge";
import StatusBadge from "./StatusBadge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import api from "@/lib/api";
import { TASK_STATUS } from "@/constant";
import { useTasks } from "@/lib/services/task";
interface TaskTableViewProps {
  tasks: Task[];
}

const TaskTableView = ({ tasks }: TaskTableViewProps) => {
  const { mutate } = useTasks();
  const handleTaskCheck = async (task: Task) => {
    try {
      const res = await api.put(`/tasks/${task._id}`, {
        status: task.status === TASK_STATUS.DONE ? TASK_STATUS.TO_DO : TASK_STATUS.DONE,
      });
      mutate(
        tasks.map(t => {
          if (t._id === task._id) {
            return {
              ...t,
              status: task.status === TASK_STATUS.DONE ? TASK_STATUS.TO_DO : TASK_STATUS.DONE,
            };
          }
          return t;
        }),
        { revalidate: false }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(tasks);

  const handleSubTaskCheck = async (subTask: SubTask, task: Task) => {
    try {
      const res = await api.put(`/tasks/${task._id}`, {
        subTasks: task.subTasks.map(subTask => {
          if (subTask._id === subTask._id) {
            return {
              ...subTask,
              status: subTask.status === TASK_STATUS.DONE ? TASK_STATUS.TO_DO : TASK_STATUS.DONE,
            };
          }
          return subTask;
        }),
      });
      mutate(
        tasks.map(t => {
          if (t._id === task._id) {
            return {
              ...t,
              subTasks: task.subTasks.map(subTask => {
                if (subTask._id === subTask._id) {
                  return {
                    ...subTask,
                    status:
                      subTask.status === TASK_STATUS.DONE ? TASK_STATUS.TO_DO : TASK_STATUS.DONE,
                  };
                }
                return subTask;
              }),
            };
          }
          return t;
        }),
        { revalidate: false }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6 min-h-screen dark:bg-slate-700">
      <Table className={cn("bg-white dark:bg-slate-600 rounded-xl")}>
        <TableCaption>Tasks</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Progress</TableHead>
            <TableHead>Due Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map(task => (
            <>
              <TableRow key={task._id}>
                <TableCell>
                  <label htmlFor={task._id} className="flex items-center">
                    <Checkbox
                      id={task._id}
                      className="mr-2"
                      checked={task.status === TASK_STATUS.DONE}
                      onCheckedChange={() => handleTaskCheck(task)}
                    />
                    <span>{task.title}</span>
                  </label>
                </TableCell>
                <TableCell className="w-1/4">{task.desc}</TableCell>
                <TableCell>
                  <PriorityBadge priority={task.priority} />
                </TableCell>
                <TableCell>
                  <StatusBadge status={task.status} />
                </TableCell>
                <TableCell className="w-[170px]">
                  <div className="flex items-center gap-2">
                    <Progress
                      value={
                        (task.subTasks.filter(st => st.status === TASK_STATUS.DONE).length /
                          task.subTasks.length) *
                        100
                      }
                    />
                    <span className="text-xs text-gray-500">
                      {(task.subTasks.filter(st => st.status === TASK_STATUS.DONE).length /
                        task.subTasks.length) *
                        100}%
                    </span>
                  </div>
                </TableCell>
                <TableCell>{new Date(task.dueDate).toLocaleDateString()}</TableCell>
              </TableRow>
              {task.subTasks.map(subTask => (
                <TableRow key={subTask.title}>
                  <TableCell>
                    <label htmlFor={subTask.title} className="flex items-center">
                      <CornerDownRight className="w-4 h-4 mr-2" />
                      <Checkbox
                        id={subTask.title}
                        className="mr-2"
                        checked={subTask.status === TASK_STATUS.DONE}
                        onCheckedChange={() => handleSubTaskCheck(subTask, task)}
                      />
                      <span>{subTask.title}</span>
                    </label>
                  </TableCell>
                  <TableCell>{subTask.desc}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <PriorityBadge priority={subTask.priority} />
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={subTask.status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={subTask.progress} />
                      <span className="text-xs text-gray-500">{subTask.progress}</span>
                    </div>
                  </TableCell>
                  <TableCell>{new Date(task.dueDate).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TaskTableView;
