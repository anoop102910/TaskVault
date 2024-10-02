import { create } from "zustand";

interface FilterState {
  projectId: string;
  status: string | undefined;
  priority: string | undefined;
  setProjectId: (projectId: string) => void;
  setStatus: (status: string) => void;
  setPriority: (priority: string) => void;
}

export const useFilter = create<FilterState>(set => ({
  projectId: "",    
  status: undefined,
  priority: undefined,
  setProjectId: projectId => set({ projectId }),
  setStatus: status => set({ status }),
  setPriority: priority => set({ priority }),
}));
