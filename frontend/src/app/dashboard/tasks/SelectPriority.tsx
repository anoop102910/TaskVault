import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TASK_PRIORITY, TASK_PRIORITY_COLORS } from "@/constant";
import { cn } from "@/lib/utils";
interface SelectPriorityProps {
  priority: string;
  onPriorityChange: (priority: string) => void;
  className?: string;
}
function SelectPriority({ priority, onPriorityChange, className }: SelectPriorityProps) {
  return (
    <Select value={priority} onValueChange={onPriorityChange}>
      <SelectTrigger className={cn("w-[180px]", className)}>
        <SelectValue placeholder="Priority" />
      </SelectTrigger>
      <SelectContent>
        {/* <SelectItem value="all">
          <span className="w-2 h-2 rounded-full inline-block mr-2 bg-gray-500"></span>
          All
        </SelectItem> */}
        {Object.values(TASK_PRIORITY).map(priority => (
          <SelectItem key={priority} value={priority}>
            <span
              className={`${TASK_PRIORITY_COLORS[priority]} w-2 h-2 rounded-full inline-block mr-2`}
            ></span>
            {priority}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default SelectPriority;
