import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { TASK_STATUS_COLORS } from "@/constant";
const StatusBadge = ({ status }: { status: string }) => {
  return <Badge className={cn(TASK_STATUS_COLORS[status], `dark:${TASK_STATUS_COLORS[status]} dark:text-white   `)}> {status}</Badge>;
};

export default StatusBadge;