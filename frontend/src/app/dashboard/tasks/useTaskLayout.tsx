import { create } from "zustand";

interface layoutState {
  layout: "table" | "list";
  setLayout: (layout: "table" | "list") => void;
}

export const useTaskLayout = create<layoutState>((set) => ({
  layout: "list",
  setLayout: (layout) => set({ layout }),
}));