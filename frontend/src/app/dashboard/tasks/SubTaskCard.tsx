import { Checkbox } from "@/components/ui/checkbox";
interface SubTaskCardProps {
  title: string;
  isDone: boolean;
}

const SubTaskCard = ({ title, isDone }: SubTaskCardProps) => {
  return (
    <div className="flex items-center gap-x-2">
      <Checkbox className="w-4 h-4" checked={isDone} />
      <span className="text-sm text-slate-700">{title}</span>
    </div>
  );
};

export default SubTaskCard;