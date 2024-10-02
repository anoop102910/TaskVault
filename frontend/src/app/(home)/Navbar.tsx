"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Home, Download, Settings } from "lucide-react";
interface Link {
  title: string;
  path: string;
  icon: React.ReactNode;
}
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const links: Link[] = [
    { title: "Pricing", path: "/pricing", icon: <Home /> },
    { title: "Download", path: "/download", icon: <Download /> },
    { title: "Integration", path: "/integration", icon: <Settings /> },
  ];

  return (
    <div>
      <nav className="bg-white flex items-center justify-between border border-slate-800 dark:border-slate-200 px-4 sm:px-4 py-1.5 rounded-full mt-2 sticky top-0 z-50">
        <Link href="/">
          <h1 className="text-slate-800 dark:text-slate-200 text-lg font-semibold ">Fintask</h1>
        </Link>
        <div className="flex items-center">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="sm:hidden">
            <Menu />
          </button>
          <ul className={`flex space-x-4 ml-4 sm:ml-20 max-md:hidden`}>
            {links.map(link => (
              <li key={link.title}>
                <Link
                  href={link.path}
                  className="text-slate-800 dark:text-slate-200 hover:underline"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <Link href="/auth/login" className="hidden sm:block">
          <Button className="px-4 sm:px-6 py-3" variant="secondary">
            Join Free
          </Button>
        </Link>
      </nav>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="flex flex-col">
          <ul className="flex space-x-4 ml-4 sm:ml-20 md:hidden flex-col">
            {links.map(link => (
              <li key={link.title} className="flex items-center gap-2 w-full justify-center py-2">
                {link.icon}
                <Link
                  href={link.path}
                  className="text-slate-800 dark:text-slate-200 hover:underline"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>

          <Link href="/auth/login" className="hidden sm:block">
            <Button className="px-4 sm:px-6 py-3" variant="secondary">
              Join Free
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
