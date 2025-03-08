"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Globe, Atom, Music, Film, Gamepad2 } from "lucide-react";
import SideBar from "@/components/SideBar";
import { useRouter } from "next/navigation";

// Mock data for quizzes
const quizCategories = [
  { id: 1, name: "Science", icon: Atom, count: 12, color: "bg-blue-500" },
  { id: 2, name: "Geography", icon: Globe, count: 8, color: "bg-green-500" },
  { id: 3, name: "History", icon: BookOpen, count: 10, color: "bg-amber-500" },
  { id: 4, name: "Music", icon: Music, count: 6, color: "bg-pink-500" },
  { id: 5, name: "Movies", icon: Film, count: 9, color: "bg-red-500" },
  { id: 6, name: "Gaming", icon: Gamepad2, count: 7, color: "bg-indigo-500" },
];

const recentQuizzes = [
  {
    id: 1,
    title: "Science Quiz: Basics of Physics",
    score: 8,
    total: 10,
    date: "2 days ago",
    category: "Science",
  },
  {
    id: 2,
    title: "Geography Challenge: World Capitals",
    score: 7,
    total: 10,
    date: "5 days ago",
    category: "Geography",
  },
  {
    id: 3,
    title: "Music Trivia: 80s Hits",
    score: 9,
    total: 10,
    date: "1 week ago",
    category: "Music",
  },
];

export default function DashboardPage() {
  const router = useRouter();
  return (
    <div className="flex min-h-screen  ">
      <SideBar />

      <div className="flex-1">
        <main className="p-4 md:p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <Button
              className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
              onClick={() => router.push("/quiz/12")}
            >
              Start New Quiz
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Total Quizzes Taken
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">24</div>
                <p className="text-xs text-green-500 mt-1">
                  +12% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Average Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">78%</div>
                <p className="text-xs text-green-500 mt-1">
                  +5% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Badges Earned
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">12</div>
                <p className="text-xs text-green-500 mt-1">+3 new this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Global Rank
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">#342</div>
                <p className="text-xs text-green-500 mt-1">Up 28 positions</p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="categories" className="w-full">
            <TabsList className="grid w-full md:w-auto grid-cols-2">
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="recent">Recent Quizzes</TabsTrigger>
            </TabsList>

            {/* Categories Tab */}
            <TabsContent value="categories" className="mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {quizCategories.map((category) => (
                  <Card key={category.id} className="overflow-hidden">
                    <div className={`h-2 ${category.color}`}></div>
                    <CardContent className="p-4">
                      <div className="flex items-center">
                        <div
                          className={`p-2 rounded-full ${category.color} bg-opacity-10 mr-3`}
                        >
                          <category.icon
                            className={`h-5 w-5 ${category.color} text-white`}
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">{category.name}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {category.count} quizzes
                          </p>
                        </div>
                        <Button variant="ghost" size="sm" className="ml-auto">
                          Explore
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Recent Quizzes Tab */}
            <TabsContent value="recent" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Your Recent Quizzes</CardTitle>
                  <CardDescription>
                    Your quiz activity from the past month
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentQuizzes.map((quiz) => (
                      <div
                        key={quiz.id}
                        className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-4 last:border-0 last:pb-0"
                      >
                        <div>
                          <h3 className="font-medium">{quiz.title}</h3>
                          <div className="flex items-center mt-1">
                            <Badge variant="outline" className="mr-2 text-xs">
                              {quiz.category}
                            </Badge>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {quiz.date}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">
                            {quiz.score}/{quiz.total}
                          </div>
                          <Progress
                            value={(quiz.score / quiz.total) * 100}
                            className="h-2 w-24 mt-1"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All History
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
