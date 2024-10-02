'use client'
import Sidebar from "./Sidebar";
import { Separator } from "@/components/ui/separator";
import Navbar from "./Navbar";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="bg-slate-100  flex min-h-screen dark:bg-gray-800 dark:text-slate-200 overflow-x-hidden">
      <Sidebar className="" />
      <div className="flex-1 mt-1 relative">
        <Navbar />
        <Separator orientation="horizontal" />
        <div>{children}</div>
      </div>
    </div>
  );
}
