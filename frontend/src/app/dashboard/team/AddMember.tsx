"use client";
import { useState } from "react";
import SelectUser from "../../../components/shared/SelectUser";
import { useUsers, useTeamMembers } from "@/lib/services/user";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { toast } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function AddMember() {
  const { users } = useUsers({});
  const [teamName, setTeamName] = useState<string>("");
  const { users: teamMembers, isLoading, error, mutate } = useTeamMembers({});
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [pending, setPending] = useState(false);
  if (isLoading) return <div>Loading...</div>;
  console.log(teamMembers);

  const handleAddMember = async () => {
    setPending(true);
    console.log(selectedMembers);
    try {
      if (teamMembers?.length == 0) {
        const res = await api.post("/teams", { members: selectedMembers, name: teamName });
        mutate();
        toast.success("Team created successfully");
      } else {
        const res = await api.put(`/teams`, { members: selectedMembers });
        mutate();
        toast.success("Member added successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to add member");
    }
    setPending(false);
  };

  return (
    <div>
      <div className="mb-2 ">
        {teamMembers?.length == 0 && (
          <div>
            <Label htmlFor="teamName">Team Name</Label>
            <Input
              placeholder="Enter team name"
              id="teamName"
              value={teamName}
              onChange={e => setTeamName(e.target.value)}
            />
          </div>
        )}
      </div>
      <div className="mb-4">
        <Label htmlFor="teamMembers">Team Members</Label>
        <SelectUser
          users={users?.filter(user => !teamMembers?.some(member => member._id === user._id))}
          selectedUsers={selectedMembers}
          onSelectUser={setSelectedMembers}
        />
      </div>
      <Button pending={pending} className="w-full" onClick={handleAddMember}>
        {teamMembers?.length == 0 ? "Create Team" : "Add Member"}
      </Button>
    </div>
  );
}
