"use client";
import React from "react";
import Link from "next/link";
import {
  HomeIcon,
  BookCheck,
  User2Icon,
  LogOut,
  FolderKanban,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/context/AuthProvider";
import { clearCache } from "@/lib/services/util";


function Sidebar({ className }) {
  const activeLink = usePathname()
  const router = useRouter();
  const { logout,user } = useAuth();

  const dashboardItems = [
    {
      icon: HomeIcon,
      title: "Home",
      link: "/dashboard/main",
    },
    {
      icon: BookCheck,
      title: "Tasks",
      link: "/dashboard/tasks",
    },
    {
      icon: FolderKanban,
      title: "Projects",
      link: "/dashboard/projects",
    },
   
  ];

  if(user.role==='manager'){
    dashboardItems.push({
      icon: User2Icon,
      title: "Team",
      link: "/dashboard/team",
    })
  }
  

  const handleLogout = async ()=>{
    logout();
    router.push('/auth/login')
    setTimeout(()=>{
      clearCache()
    },1000)
  }
  const style = {
    button:
      "flex mb-4 w-full items-center px-6 pr-12  py-3 rounded-xl  text-slate-700 hover:bg-slate-800 hover:text-white transition duration-150 cursor-pointer dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-gray-50",
    icon: "hover:text-white text-2xl dark:text-gray-400 dark:hover:text-gray-50",
    text: "ml-4 text-[0.9rem] font-semibold  tracking-wider text-sm dark:text-gray-300",
  };
  return (
    <aside
      aria-label="sidebar "
      aria-controls="default-sidebar"
      className={`${className} hidden lg:block sticky top-0 left-0 bottom-0 max-h-screen bg-white font-urbanist min-w-max px-3 dark:bg-gray-800 dark:text-gray-300`}
    >
      <div className="pt-10 hover:text-slate-100 text-slate-600 dark:text-gray-400 dark:hover:text-gray-50"></div>

      <div className="wrapper pt-6">
        <ul>
          { dashboardItems.map((item, index) => (
            <li key={item.title}>
              <Link href={item.link} className={cn(style.button, activeLink === item.link && "bg-slate-900 text-white")}>
                <item.icon className={style.icon} />
                <span className={style.text}>{item.title}</span>
              </Link>
            </li>
          ))}
          <button onClick={handleLogout} className={cn(style.button, activeLink === "/dashboard/main" && "bg-slate-900 text-white")}>
            <LogOut className={style.icon} />
            <span className={style.text}>Sign out</span>
          </button>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
