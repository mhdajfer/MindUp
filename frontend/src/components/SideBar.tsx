import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BarChart3,
  Brain,
  Clock,
  LogOut,
  Menu,
  Settings,
  Trophy,
} from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SideBar = () => {
  const router = useRouter();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <div>
      <div className="min-h-screen hidden md:flex w-64 flex-col  border-r border-gray-200 ">
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
            MindUp
          </h2>
        </div>
        <div className="flex-1 overflow-auto py-4 ">
          <nav className="space-y-1 px-2">
            <Link
              href="/dashboard"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md  "
            >
              <BarChart3 className="mr-3 h-5 w-5" />
              Dashboard
            </Link>
            <Link
              href="#"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-violet-50 hover:text-violet-700 "
            >
              <Brain className="mr-3 h-5 w-5" />
              Quizzes
            </Link>
            <Link
              href="#"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-violet-50 hover:text-violet-700"
            >
              <Trophy className="mr-3 h-5 w-5" />
              Leaderboard
            </Link>
            <Link
              href="#"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-violet-50 hover:text-violet-700"
            >
              <Clock className="mr-3 h-5 w-5" />
              History
            </Link>
            <Link
              href="#"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-violet-50 hover:text-violet-700"
            >
              <Settings className="mr-3 h-5 w-5" />
              Settings
            </Link>
          </nav>
        </div>
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 flex justify-between items-center cursor-pointer">
          <div className="flex items-center">
            <Avatar>
              <AvatarImage
                src="/placeholder.svg?height=40&width=40"
                alt="User"
              />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                john@example.com
              </p>
            </div>
          </div>
          <div>
            <LogOut
              onClick={() => {
                Cookies.remove("accessToken");
                router.push("/login");
              }}
            />
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-900 shadow-lg">
            <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
              <h2 className="text-xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                QuizMaster
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex-1 overflow-auto py-4">
              <nav className="space-y-1 px-2">
                <Link
                  href="/dashboard"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-100"
                >
                  <BarChart3 className="mr-3 h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="#"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-violet-50 hover:text-violet-700 dark:text-gray-300 dark:hover:bg-violet-900 dark:hover:text-violet-100"
                >
                  <Brain className="mr-3 h-5 w-5" />
                  Quizzes
                </Link>
                <Link
                  href="#"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-violet-50 hover:text-violet-700 dark:text-gray-300 dark:hover:bg-violet-900 dark:hover:text-violet-100"
                >
                  <Trophy className="mr-3 h-5 w-5" />
                  Leaderboard
                </Link>
                <Link
                  href="#"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-violet-50 hover:text-violet-700 dark:text-gray-300 dark:hover:bg-violet-900 dark:hover:text-violet-100"
                >
                  <Clock className="mr-3 h-5 w-5" />
                  History
                </Link>
                <Link
                  href="#"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-violet-50 hover:text-violet-700 dark:text-gray-300 dark:hover:bg-violet-900 dark:hover:text-violet-100"
                >
                  <Settings className="mr-3 h-5 w-5" />
                  Settings
                </Link>
              </nav>
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-gray-800">
              <div className="flex items-center">
                <Avatar>
                  <AvatarImage
                    src="/placeholder.svg?height=40&width=40"
                    alt="User"
                  />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    john@example.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBar;
