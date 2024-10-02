import { fetcher, useSWRWithParams } from "./util";
import { Team, User } from "@/index";

interface UserParams {
  id?: string;
  search?: string;
  role?: string;
}
const filterUser = (users: User[], params: UserParams) => {
  return users.filter(user => 
    (!params.id || user._id === params.id) &&
    (!params.search || user.name.includes(params.search)) &&
    (!params.role || user.role === params.role)
  );
};

export const useUsers = (params: UserParams) => {
  const { data, error, isLoading, mutate } = useSWRWithParams<User[]>("/users", fetcher);
  const filteredUsers = data ? filterUser(data, params) : undefined;
  return { users: filteredUsers, error, isLoading, mutate };
};

export const useTeamMembers = (params: UserParams) => {
  const { data, error, isLoading, mutate } = useSWRWithParams<Team>("/teams", fetcher);
  console.log('team data', data);
  const teamMembers = data ? data.members : [];
  const filteredUsers = teamMembers ? filterUser(teamMembers, params) : [];
  return { users: filteredUsers, error, isLoading, mutate };
};
