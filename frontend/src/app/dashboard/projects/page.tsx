"use client";
import ProjectCard from "./ProjectCard";
import { useProjects } from "@/lib/services/project";
import ProjectCardSkeleton from "./ProjectCardSkeleton";
import Error from "@/components/shared/Error";
const ProjectsPage = () => {
  const { projects, isLoading, error } = useProjects({});

  if (isLoading) return <ProjectSkeleton />;
  if (error) return <Error />;
  if(!projects) return <ProjectEmpty />;
  if (projects?.length == 0) return <ProjectEmpty />;

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {projects!.map((project, index) => (
          <ProjectCard key={project._id} project={project} index={index} />
        ))}
      </div>
    </div>
  );
};

const ProjectSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 12 }).map((_, index) => (
        <ProjectCardSkeleton key={index} />
      ))}
    </div>
  );
};


const ProjectEmpty = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] border border-dashed p-4">
      <div className="flex flex-col items-center justify-center">
        <div className="text-gray-500 text-xl">No projects</div>
      </div>
    </div>
  );
};

export default ProjectsPage;
