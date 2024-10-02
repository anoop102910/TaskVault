import React from "react";
import { useFilter } from "./useFilter";
import SelectPriority from "./SelectPriority";
function PriorityFilter() {
  const { priority, setPriority } = useFilter();
  return <SelectPriority priority={priority || ""} onPriorityChange={setPriority} />;
}

export default PriorityFilter;
