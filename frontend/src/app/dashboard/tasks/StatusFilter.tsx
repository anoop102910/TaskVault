import React from "react";
import { useFilter } from "./useFilter";
import SelectStatus from "./SelectStatus";
function StatusFilter() {
  const { status, setStatus } = useFilter();
  return <SelectStatus status={status || ""} onStatusChange={setStatus} />;
}

export default StatusFilter;
