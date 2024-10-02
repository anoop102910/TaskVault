import React, { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProjects } from "@/lib/services/project";
import { useFilter } from "./useFilter";
import { PROJECT_STATUS_COLORS } from "@/constant";

function ProjectFilter() {
  const { projects, isLoading } = useProjects();
  const { projectId, setProjectId } = useFilter();

  useEffect(() => {
    if (!projectId && projects?.[0]?._id) {
      setProjectId(projects?.[0]?._id);
    }
  }, [projectId, projects]);

  return (
    <Select value={projectId} onValueChange={setProjectId}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={isLoading ? "Loading..." : "Projects"} />
      </SelectTrigger>
      <SelectContent>
        {projects?.map(project => (
          <SelectItem key={project._id} value={project._id}>
            <span
              className={`${PROJECT_STATUS_COLORS[project.status]} w-2 h-2 rounded-full inline-block mr-2`}
            ></span>
            {project.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default ProjectFilter;
