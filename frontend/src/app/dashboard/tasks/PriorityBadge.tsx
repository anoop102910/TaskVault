import { Badge } from "@/components/ui/badge";
import { PRIORITY_COLORS } from "@/constant";
import { cn } from "@/lib/utils";

const PriorityBadge = ({ priority }: { priority: string }) => {
  return (
    <Badge
      className={cn(PRIORITY_COLORS[priority], `dark:${PRIORITY_COLORS[priority]} dark:text-white`)}
    >
      {priority}
    </Badge>
  );
};

export default PriorityBadge;
