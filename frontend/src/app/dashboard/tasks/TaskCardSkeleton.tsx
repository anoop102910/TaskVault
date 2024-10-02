"use client";
import { Skeleton } from "@/components/ui/skeleton";

const TaskCardSkeleton = () => {
  return (
    <div className="rounded-xl border p-4 dark:bg-gray-800">
      <div className="flex justify-between items-center mb-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-6 w-6" />
      </div>
      <Skeleton className="h-6 w-3/4 mb-2" />
      <Skeleton className="h-4 w-1/2 mb-4" />
      <Skeleton className="h-4 w-full" />
      <div className="flex items-center justify-between gap-4">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-8 w-8" />
      </div>
    </div>
  );
};

export default TaskCardSkeleton;
