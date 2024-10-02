"use client";
import { Badge } from "@/components/ui/badge";
import { PROJECT_STATUS_COLORS } from "@/constant";
import { cn } from "@/lib/utils";

const StatusBadge = ({ status }: { status: string }) => {
  return (
    <Badge
      className={cn(
        PROJECT_STATUS_COLORS[status],
        `dark:${PROJECT_STATUS_COLORS[status]} dark:text-white`
      )}
    >
      {status}
    </Badge>
  );
};

export default StatusBadge;
