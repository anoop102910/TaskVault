import { Calculator, Target, Briefcase,} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Feature {
  title: string;
  description: string;
  icon: React.ElementType;
}

async function Home() {
  const features: Feature[] = [
    {
      title: "Task Management",
      description: "Create, assign, and track tasks to ensure timely completion of projects.",
      icon: Briefcase,
    },
    {
      title: "Project Tracking",
      description: "Monitor project progress, identify bottlenecks, and optimize workflows.",
      icon: Calculator,
    },
    {
      title: "Goal Setting",
      description: "Set and track project goals to ensure alignment with company objectives.",
      icon: Target,
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 ">
      {/* Hero Section */}
      <section className="py-16  relative">
        <div className=" px-4 flex flex-col items-center ">
          <h1 className="text-5xl font-semibold mb-8">
            Manage Your{" "}
            <img
              src="/avtgrp.png"
              className="inline-block w-20 h-10 object-cover -rotate-12"
              alt=""
            />{" "}
            Team's
          </h1>
          <h1 className="text-5xl font-semibold mb-8 text-orange-600">Productivity</h1>
          <p className="text-lg text-center mb-12 text-slate-500 w-1/2">
            Plan projects, stay on track and deliver on time without overworking your team
          </p>
          <div className="flex justify-center">
            <Link href="/auth/login">
              <Button className="px-12 py-6" variant="primary">
                Try Now Free
              </Button>
            </Link>
          </div>
          <img src="/task1.png" className="absolute bottom-0 -left-40 w-80 rotate-45" alt="" />
          <img src="/task2.png" className="absolute bottom-0 -right-40 w-80 -rotate-45" alt="" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Key Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {features.map(feature => (
              <div
                className="bg-white p-6 rounded-xl items-center flex flex-col border border-slate-800 dark:border-slate-200 "
                key={feature.title}
              >
                <feature.icon className="w-10 h-10 text-violet-600 mb-4 " />
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-700 text-center">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
