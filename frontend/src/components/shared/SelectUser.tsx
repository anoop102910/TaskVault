import { useState, useRef } from "react";
import { User } from "@/index";
import { UserAvatar } from "@/components/ui/avatar";
import { XIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SelectUserProps {
  users: User[] | undefined;
  selectedUsers: string[];
  onSelectUser: (users: string[]) => void;
  open?: boolean;
}
const SelectUser = ({ users, selectedUsers, onSelectUser, open = false }: SelectUserProps) => {
  const [query, setQuery] = useState<string>("");
  const [view, setView] = useState<boolean>(false);
  const handleRemoveAssignedTo = (id: string) => {
    onSelectUser(selectedUsers.filter(_id => _id !== id));
  };
  const inputRef = useRef<HTMLInputElement>(null);
  if (!users) return <Input type="text" ref={inputRef} placeholder="Loading..." value={query} />;
  return (
    <div className="relative z-50 ">
      {selectedUsers.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {users
            .filter(user => selectedUsers.includes(user._id))
            .map(user => (
              <UserBadge key={user._id} user={user} onRemove={handleRemoveAssignedTo} />
            ))}
        </div>
      )}
      <Input
        type="text"
        ref={inputRef}
        placeholder="Search members"
        value={query}
        onChange={e => setQuery(e.target.value)}
        onFocus={() => setView(true)}
      />
      {(query.length > 0 || view) && (
        <div className="flex  flex-col p-2  w-full animate-height bg-white shadow-md rounded-md mt-2 space-y-2 max-h-[200px] overflow-y-auto border ">
          <span className="text-[10px] uppercase font-medium">Suggestions</span>
          {users
            .filter(
              user =>
                (user.name.toLowerCase().includes(query.toLowerCase()) ||
                  user.email.toLowerCase().includes(query.toLowerCase())) &&
                !selectedUsers.includes(user._id)
            )
            .map(user => (
              <div
                className="focus:bg-slate-100 focus:outline-none focus:ring-1"
                role="button"
                tabIndex={0}
                onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
                  e.preventDefault();
                  if (e.key === "Enter" || e.key === " ") {
                    onSelectUser([...selectedUsers, user._id]);
                  }
                }}
                key={user._id}
                onClick={() => {
                  onSelectUser([...selectedUsers, user._id]);
                }}
              >
                <UserCard user={user} onSelect={() => {}} />
              </div>
            ))}
          {users.length === 0 && <span className="text-sm text-gray-500">No users found</span>}
        </div>
      )}
    </div>
  );
};

interface UserBadgeProps {
  user: User;
  onRemove: (id: string) => void;
}

const UserBadge = ({ user, onRemove }: UserBadgeProps) => {
  return (
    <div className="flex items-center gap-2 rounded-full p-1 hover:bg-slate-100 border border-slate-200 ">
      <UserAvatar user={user} size="xs" />
      <span className="text-[12px] font-medium">{user.name}</span>
      <span className="text-xs font-medium">
        <XIcon className="w-4 h-4" onClick={() => onRemove(user._id)} />
      </span>
    </div>
  );
};

interface UserCardProps {
  user: User;
  onSelect: (user: User) => void;
}

const UserCard = ({ user, onSelect }: UserCardProps) => {
  return (
    <label htmlFor="terms" className="cursor-pointer">
      <div className="flex items-center gap-2 rounded-md p-2 hover:bg-slate-100">
        <UserAvatar user={user} size="sm" />
        <div className="flex flex-col">
          <span className="text-sm font-medium">{user.name}</span>
          <span className="text-xs text-gray-500">{user.email}</span>
        </div>
      </div>
    </label>
  );
};

export default SelectUser;
