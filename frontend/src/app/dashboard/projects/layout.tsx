
"use client";
import Navbar from "./Navbar";
const ProjectsPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="dark:bg-slate-700">
      <Navbar />
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};



export default ProjectsPage;
