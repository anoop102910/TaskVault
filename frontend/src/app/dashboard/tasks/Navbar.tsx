import { Button } from "@/components/ui/button";
import { AvatarGroup } from "@/components/ui/avatar";
import { PlusIcon } from "@radix-ui/react-icons";
import { DialogForm } from "@/components/ui/dialog";
import { useTaskLayout } from "./useTaskLayout";
import { ListIcon, TableIcon } from "lucide-react";
import StatusFilter from "./StatusFilter";
import ProjectFilter from "./ProjectFilter";
import AddMember from "./AddMember";
import { useTeamMembers } from "@/lib/services/user";
import { useAuth } from "@/lib/context/AuthProvider";
import PriorityFilter from "./PriorityFilter";
export default function Navbar() {
  const { setLayout } = useTaskLayout();
  const {user} = useAuth();
  const { users, isLoading, error } = useTeamMembers({});
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className="flex flex-col md:flex-row justify-between gap-2 bg-white px-4 py-2 dark:bg-slate-800">
      <div className="flex  items-center gap-2 ">
        <AvatarGroup users={users!.slice(0, 5)} />
        <ProjectFilter />
        <PriorityFilter />
      </div>
      <div className="flex items-center gap-x-2">
       { user?.role === "manager" && <DialogForm
          trigger={
            <Button size={"sm"}>
              <PlusIcon className="w-4 h-4 mr-2" />
              Add Member
            </Button>
          }
          title={"Add Member"}
          desc={"Add a member to the task"}
        >
          <AddMember />
        </DialogForm>}
        <Button size={"sm"} onClick={() => setLayout("list")}>
          <ListIcon className="w-4 h-4 mr-2" />
          List
        </Button>
        <Button size={"sm"} onClick={() => setLayout("table")}>
          <TableIcon className="w-4 h-4 mr-2" />
          Table
        </Button>
      </div>
    </div>
  );
}
