"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPersonWalking,
  faCheckCircle,
  faTimes,
  faBars,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { useUser } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";

interface Module {
  id: number;
  name: string;
  icon: string;
  completed: boolean;
}

interface CompletedModule {
  module_id: number;
}

const iconMap: { [key: string]: IconDefinition } = {
  faPersonWalking: faPersonWalking,
  // Add more icons
};

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="ml-2 px-2 py-1 text-xs font-semibold rounded-full bg-[#cdd0d2] text-white">
    {children}
  </span>
);

export default function ModulesListingPage() {
  const [modules, setModules] = useState<Module[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "complete" | "todo">("all");
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function fetchModules() {
      try {
        // Fetch user profile and completed modules
        const userResponse = await fetch("/api/user");
        if (!userResponse.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await userResponse.json();
        const completedModuleIds = userData.completed_modules.map(
          (cm: CompletedModule) => cm.module_id
        );

        const { data: modulesData, error } = await supabase
          .from("modules")
          .select("id, name, icon")
          .order("id", { ascending: true });

        if (error) {
          throw error;
        }

        const modulesWithCompletionStatus =
          modulesData?.map((module) => ({
            ...module,
            completed: completedModuleIds.includes(module.id),
          })) || [];

        setModules(modulesWithCompletionStatus);
      } catch (error) {
        console.error("Error fetching modules:", error);
        setError("Error loading modules. Please try again later.");
      }
    }
    fetchModules();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  const getIcon = (iconName: string) => {
    const icon = iconMap[iconName];
    return icon ? <FontAwesomeIcon icon={icon} className="h-6 w-6" /> : null;
  };

  const filteredModules = modules.filter((m) => {
    if (filter === "all") return true;
    if (filter === "complete") return m.completed;
    if (filter === "todo") return !m.completed;
    return true;
  });

  const completedModules = modules.filter((m) => m.completed);
  const todoModules = modules.filter((m) => !m.completed);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="container mx-auto bg-white min-h-screen">
      <div className="bg-white p-4 flex items-center space-x-4">
        <Button
          className="bg-[#D6D0FD] p-2 rounded-lg flex flex-col justify-center items-center"
          onClick={handleClick}
        >
          <FontAwesomeIcon
            icon={isOpen ? faTimes : faBars}
            className="h-6 w-6 text-#2F3336 "
          />
        </Button>
        <h1 className="text-2xl font-bold">
          Welcome {user?.firstName || user?.username || "User"}
        </h1>
        <div className="ml-auto">
          <UserButton />
        </div>
      </div>
      <div className="h-px bg-gray-200 w-11/12 mx-auto " />

      {isOpen && (
        <div className="absolute top-16 left-0 w-64 bg-white shadow-lg z-10">
          <ul className="py-2">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Home</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Profile
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Settings
            </li>
            {/* more menu items */}
          </ul>
        </div>
      )}

      <div className="p-4">
        <div className="flex space-x-2 mb-4">
          <Button
            onClick={() => setFilter("all")}
            variant={filter === "all" ? "default" : "outline"}
            className="rounded-full border-0 shadow-xl"
          >
            All
            <Badge>{modules.length}</Badge>
          </Button>
          <Button
            onClick={() => setFilter("complete")}
            variant={filter === "complete" ? "default" : "outline"}
            className="rounded-full border-0 shadow-xl "
          >
            Completed
            {completedModules.length > 0 && (
              <Badge>{completedModules.length}</Badge>
            )}
          </Button>
          <Button
            onClick={() => setFilter("todo")}
            variant={filter === "todo" ? "outline" : "default"}
            className="rounded-full border-1 border-gray-200  shadow-xl"
          >
            To Do
            {todoModules.length > 0 && <Badge>{todoModules.length}</Badge>}
          </Button>
        </div>

        <div className="space-y-4">
          {filteredModules.map((module) => (
            <Link href={`/module/${module.id}/page/1`} key={module.id}>
              <Card
                className={`hover:shadow-lg transition-shadow duration-200 ${
                  module.completed ? "bg-[#f0f0f0]" : "bg-[#fafafa]"
                }`}
              >
                <CardHeader className="flex flex-row items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-[#feecba] p-2 rounded-xl">
                      {getIcon(module.icon)}
                    </div>
                    <CardTitle>{module.name}</CardTitle>
                  </div>
                  {module.completed && (
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className="h-6 w-6 text-[#D6D0FD]"
                    />
                  )}
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
