import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TASK_STATUS, TASK_STATUS_COLORS } from "@/constant";
import { cn } from "@/lib/utils";
interface SelectStatusProps {
  status: string;
  onStatusChange: (status: string) => void;
  className?: string;
}
function SelectStatus({ status, onStatusChange, className }: SelectStatusProps) {
  return (
    <Select value={status} onValueChange={onStatusChange}>
      <SelectTrigger className={cn("w-[180px]", className)}>
        <SelectValue placeholder="Status" />
      </SelectTrigger>
      <SelectContent>
        {Object.values(TASK_STATUS).map(status => (
          <SelectItem key={status} value={status}>
            <span
              className={`${TASK_STATUS_COLORS[status]} w-2 h-2 rounded-full inline-block mr-2`}
            ></span>
            {status}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default SelectStatus;
