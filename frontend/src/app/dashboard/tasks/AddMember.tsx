import { useState } from "react";
import SelectUser from "../../../components/shared/SelectUser";
import { useUsers } from "@/lib/services/user";
export default function AddMember() {
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const {users} = useUsers({});
  return (
    <SelectUser
      users={users}
      selectedUsers={selectedMembers}
      onSelectUser={setSelectedMembers}
      open={true}
    />
  );
}
