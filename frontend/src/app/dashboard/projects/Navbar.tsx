"use client";
import { Button } from "@/components/ui/button";
import { AvatarGroup } from "@/components/ui/avatar";
import { PlusIcon } from "@radix-ui/react-icons";
import { DialogForm } from "@/components/ui/dialog";
import { FolderKanban } from "lucide-react";
import ProjectForm from "./ProjectForm";
import { useState } from "react";
// import StatusFilter from "./StatusFilter";
import AddMember from "../tasks/AddMember";
import { useAuth } from "@/lib/context/AuthProvider";
import { useTeamMembers } from "@/lib/services/user";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const { users, isLoading, error } = useTeamMembers({});

  return (
    <div className="flex justify-between items-center bg-white px-4 py-2 dark:bg-slate-800">
      <div className="flex items-center gap-2 ">
      {  users && <AvatarGroup users={users!.slice(0, 3)} />}
        {/* <StatusFilter /> */}
      </div>
      <div className="flex items-center gap-x-2">
        {user.role === "manager" && (
          <DialogForm
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
          </DialogForm>
        )}
        {user.role === "manager" && (
          <DialogForm
            trigger={
              <Button size={"sm"}>
                <FolderKanban className="w-4 h-4 mr-2" />
                New Project
              </Button>
            }
            title={"Create Project"}
            desc={"Create a new project"}
          >
            <ProjectForm isUpdate={false} setIsOpen={setIsOpen} />
          </DialogForm>
        )}
      </div>
    </div>
  );
}
