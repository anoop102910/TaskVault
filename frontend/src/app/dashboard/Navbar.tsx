"use client";
import Sidebar from "./Sidebar";
import { useState } from "react";
import { UserAvatar } from "@/components/ui/avatar";
import { MoonIcon, SunIcon } from "lucide-react";
import { useDark } from "@/lib/state/useDark";
import { useAuth } from "@/lib/context/AuthProvider";
import { Input } from "@/components/ui/input";
function Navbar() {
  const [hide, toggle] = useState(true);
  const { dark, toggleDarkMode } = useDark();
  const { user } = useAuth();

  return (
    <>
      <header
        onClick={() => toggle(!hide)}
        className={`sticky  z-[50] top-0 left-0 w-full gap-4 h-16 ${
          dark ? "bg-slate-700" : "bg-white"
        } flex items-center px-6 justify-between`}
      >
        {hide && <Sidebar className={` lg:hidden absolute top-0 left-0 min-h-screen `} />}
        <div className="w-[35vw]">
          <Input placeholder="Search..." type="search" />
        </div>

        <div className="flex items-center gap-4">
          <div>
            {dark ? (
              <SunIcon className="cursor-pointer" onClick={toggleDarkMode} />
            ) : (
              <MoonIcon className="cursor-pointer" onClick={toggleDarkMode} />
            )}
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <UserAvatar className="w-8 h-8" user={user} />
            <span className={`text-sm ${dark ? "text-gray-300" : "text-slate-900"}`}>
              {user.name}
            </span>
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;
