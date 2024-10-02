import { TASK_PRIORITY, TASK_STATUS, PROJECT_STATUS, ROLE } from "./constant";

export interface User {
  _id: string;
  name: string;
  avatar?: string;
  email: string;
  role?: typeof ROLE.MEMBER | typeof ROLE.MANAGER;
}

export interface TeamMembers extends User {
  totalProjects: number;
  totalTasks: number;
}

export interface SubTask {
  _id: string;
  title: string;
  desc: string;
  priority: (typeof TASK_PRIORITY)[number];
  status: (typeof TASK_STATUS)[number];
  progress: number;
}

export interface Task {
  _id: string;
  project: string;
  assignee: string;
  assignedTo: User[];
  title: string;
  desc: string;
  priority: (typeof TASK_PRIORITY)[number];
  status: (typeof TASK_STATUS)[number];
  progress: number;
  subTasks: {
    _id: string;
    title: string;
    desc: string;
    priority: (typeof TASK_PRIORITY)[number];
    status: (typeof TASK_STATUS)[number];
    progress: number;
  }[];
  dueDate: Date;
  createdAt: Date;
  updatedAt?: Date;
}

export interface Team {
  _id: string;
  name: string;
  members: User[];
  createdAt: Date;
  updatedAt?: Date;
}

export interface Project {
  _id: string;
  title: string;
  desc: string;
  members: User[];
  status: (typeof PROJECT_STATUS)[keyof typeof PROJECT_STATUS];
  progress: number;
  dueDate: Date;
  createdAt: Date;
  updatedAt?: Date;
}
