import { TASK_STATUS, TASK_PRIORITY } from "@/constant";
import { Zap, ZapOff } from "lucide-react";
import { useTasks } from "@/lib/services/task";
interface TaskCount {
  priority: string;
  completed: number;
  pending: number;
  icon: any;
}

const CountAnalytics = () => {
  const { tasks } = useTasks();
  if (!tasks) return null;
  
  const taskCount: TaskCount[] = [
      {
        priority: TASK_PRIORITY.URGENT,
        completed: tasks.filter(task => task.priority === TASK_PRIORITY.URGENT && task.status === TASK_STATUS.DONE)
          .length,
        pending: tasks.filter(task => task.priority === TASK_PRIORITY.URGENT && task.status !== TASK_STATUS.DONE)
          .length,
        icon: Zap,
      },
      {
        priority: TASK_PRIORITY.NORMAL,
        completed: tasks.filter(task => task.priority === TASK_PRIORITY.NORMAL && task.status === TASK_STATUS.DONE)
          .length,
        pending: tasks.filter(task => task.priority === TASK_PRIORITY.NORMAL && task.status !== TASK_STATUS.DONE)
          .length,
        icon: ZapOff,
      },
      {
        priority: TASK_PRIORITY.LOW,
        completed: tasks.filter(task => task.priority === TASK_PRIORITY.LOW && task.status === TASK_STATUS.DONE)
          .length,
        pending: tasks.filter(task => task.priority === TASK_PRIORITY.LOW && task.status !== TASK_STATUS.DONE)
          .length,
        icon: Zap,
    },
  ];
  return (
    <section>
      <div className="rounded-xl p-3  bg-white dark:bg-slate-700">
        <h1 className="text-lg font-semibold mb-4 dark:text-white">My Tasks</h1>
        <div className="grid grid-cols-4 gap-4">
          {taskCount.map((task, index) => (
            <TaskCard
              key={index}
              completed={task.completed}
              pending={task.pending}
              index={index}
              priority={task.priority}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface TaskCardProps {
  completed: number;
  pending: number;
  index: number;
  priority: string;
}
const TaskCard = ({ completed, pending, index, priority }: TaskCardProps) => {
  const colors = ["bg-red-200", "bg-yellow-200", "bg-green-200", "bg-blue-200"];
  return (
    <div>
      <div className={`rounded-xl p-4 ${colors[index % colors.length]} dark:bg-slate-600`}>
        <div>{priority} Tasks</div>
      <div>
          <div className="text-2xl mt-4">
            {completed} / {pending}
          </div>
      </div>
      </div>
    </div>
  );
};

export default CountAnalytics;
