import React from "react";
import { ChevronDown } from "lucide-react";

type Project = {
  name: string;
  manager: string;
  dueDate: string;
  status: "Completed" | "Delayed" | "At risk" | "On going";
  progress: number;
};

const projects: Project[] = [
  {
    name: "Nelsa web developement",
    manager: "Om prakash sao",
    dueDate: "May 25, 2023",
    status: "Completed",
    progress: 100,
  },
  {
    name: "Datascale AI app",
    manager: "Neilsan mando",
    dueDate: "Jun 20, 2023",
    status: "Delayed",
    progress: 35,
  },
  {
    name: "Media channel branding",
    manager: "Tiruvelly priya",
    dueDate: "July 13, 2023",
    status: "At risk",
    progress: 68,
  },
  {
    name: "Corlax iOS app develpoement",
    manager: "Matte hannery",
    dueDate: "Dec 20, 2023",
    status: "Completed",
    progress: 100,
  },
  {
    name: "Website builder developement",
    manager: "Sukumar rao",
    dueDate: "Mar 15, 2024",
    status: "On going",
    progress: 50,
  },
];

const statusColors = {
  Completed: "bg-green-100 text-green-800",
  Delayed: "bg-yellow-100 text-yellow-800",
  "At risk": "bg-red-100 text-red-800",
  "On going": "bg-orange-100 text-orange-800",
};

export default function ProjectTable() {
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold mb-4 dark:text-slate-800">Project summary</h2>
        <div className="flex gap-4 mb-4">
          <div className="relative">
            <select className="appearance-none bg-white border rounded-full py-2 px-4 pr-8 leading-tight focus:outline-none focus:shadow-outline">
              <option>Project</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
          <div className="relative">
            <select className="appearance-none bg-white border rounded-full py-2 px-4 pr-8 leading-tight focus:outline-none focus:shadow-outline">
              <option>Project manager</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
          <div className="relative">
            <select className="appearance-none bg-white border rounded-full py-2 px-4 pr-8 leading-tight focus:outline-none focus:shadow-outline">
              <option>Status</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
      <table className="w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Project manager</th>
            <th className="px-4 py-2 text-left">Due date</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Progress</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => (
            <tr key={index} className="border-t">
              <td className="px-4 py-2">{project.name}</td>
              <td className="px-4 py-2">{project.manager}</td>
              <td className="px-4 py-2">{project.dueDate}</td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    statusColors[project.status]
                  }`}
                >
                  {project.status}
                </span>
              </td>
              <td className="px-4 py-2">
                <div className="flex items-center">
                  <div className="w-16 h-16 rounded-full border-4 border-gray-200 flex items-center justify-center">
                    <div
                      className="w-14 h-14 rounded-full border-4 flex items-center justify-center"
                      style={{
                        borderColor: `hsl(${project.progress * 1.2}, 100%, 45%)`,
                        color: `hsl(${project.progress * 1.2}, 100%, 45%)`,
                      }}
                    >
                      {project.progress}%
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
