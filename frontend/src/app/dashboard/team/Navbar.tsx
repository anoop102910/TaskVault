"use client"
import { Button } from "@/components/ui/button";
import { AvatarGroup } from "@/components/ui/avatar";
import { PlusIcon } from "@radix-ui/react-icons";
import { DialogForm } from "@/components/ui/dialog";
import { useUsers } from "@/lib/services/user";
import { useAuth } from "@/lib/context/AuthProvider";
import AddMember from "./AddMember";

export default function Navbar() {
  const { user } = useAuth();
  const { users, isLoading, error } = useUsers({});


  return (
    <div className="flex flex-col md:flex-row justify-between gap-2 bg-white px-4 py-2 dark:bg-slate-800">
      <div className="flex  items-center gap-2 ">{users && <AvatarGroup users={users!.slice(0, 5)} />}</div>
      <div className="flex items-center gap-x-2">
        {user?.role === "manager" && (
          <DialogForm
            trigger={
              <Button size={"sm"}>
                <PlusIcon className="w-4 h-4 mr-2" />
                Add Member
              </Button>
            }
            title={"Add Member"}
            desc={"Add a member to the team"}
          >
            <AddMember />
          </DialogForm>
        )}
      </div>
    </div>
  );
}
