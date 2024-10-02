export const TASK_PRIORITY = {
  LOW: "Low",
  NORMAL: "Normal",
  URGENT: "Urgent",
};

export const TASK_STATUS = {
  TO_DO: "To Do",
  IN_PROGRESS: "In Progress",
  NEED_REVIEW: "Need Review",
  DONE: "Done",
};

export const PRIORITY_COLORS: Record<string, string> = {
  Low: "bg-green-500",
  Normal: "bg-gray-500",
  Urgent: "bg-red-500",
};

export const TASK_PRIORITY_COLORS: Record<string, string> = {
  Low: "bg-green-500",
  Normal: "bg-yellow-500",
  Urgent: "bg-red-500",
};

export const TASK_STATUS_COLORS: Record<string, string> = {
  "To Do": "bg-red-500",
  "In Progress": "bg-gray-500",
  "Need Review": "bg-yellow-500",
  Done: "bg-green-500",
};

export const TASK_STATUS_COLORS_LIGHT: Record<string, string> = {
  "To Do": "red",
  "In Progress": "gray",
  "Need Review": "yellow",
  Done: "green",
};

export const PROJECT_STATUS = {
  ACTIVE: "Active",
  ON_HOLD: "On Hold",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

export const PROJECT_STATUS_COLORS: Record<string, string> = {
  Active: "bg-green-500",
  Completed: "bg-green-500",
  "On Hold": "bg-red-500",
  Cancelled: "bg-red-500",
};

export const ROLE = {
  MEMBER: "member",
  MANAGER: "manager",
};

export const TASK_CARD_COLORS = ["bg-blue-300", "bg-yellow-300", "bg-green-300", "bg-red-300"];
