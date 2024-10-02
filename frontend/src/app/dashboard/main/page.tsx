'use client'
import ProjectsWorkload from "./ProjectCompleted";
import ProjectTable from "./ProjectTable";
import CountAnalytics from "./TaskCount";

const page = () => {
  return (
    <main className="p-6 dark:bg-gray-800">
      <CountAnalytics />
      <div className="mt-3"><ProjectTable/></div>
      <div className="mt-2"><ProjectsWorkload/></div>
    </main>
  );
};

export default page;
