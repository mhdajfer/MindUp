"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Bell,
  LogOut,
  Menu,
  Search,
  Settings,
  Trophy,
  User,
  BarChart3,
  Clock,
  BookOpen,
  Brain,
  Globe,
  Atom,
  Music,
  Film,
  Gamepad2,
} from "lucide-react"

// Mock data for quizzes
const quizCategories = [
  { id: 1, name: "Science", icon: Atom, count: 12, color: "bg-blue-500" },
  { id: 2, name: "Geography", icon: Globe, count: 8, color: "bg-green-500" },
  { id: 3, name: "History", icon: BookOpen, count: 10, color: "bg-amber-500" },
  { id: 4, name: "Music", icon: Music, count: 6, color: "bg-pink-500" },
  { id: 5, name: "Movies", icon: Film, count: 9, color: "bg-red-500" },
  { id: 6, name: "Gaming", icon: Gamepad2, count: 7, color: "bg-indigo-500" },
]

const recentQuizzes = [
  { id: 1, title: "Science Quiz: Basics of Physics", score: 8, total: 10, date: "2 days ago", category: "Science" },
  {
    id: 2,
    title: "Geography Challenge: World Capitals",
    score: 7,
    total: 10,
    date: "5 days ago",
    category: "Geography",
  },
  { id: 3, title: "Music Trivia: 80s Hits", score: 9, total: 10, date: "1 week ago", category: "Music" },
]

const popularQuizzes = [
  { id: 1, title: "Harry Potter Trivia", plays: 1245, difficulty: "Medium", category: "Movies" },
  { id: 2, title: "World Geography Challenge", plays: 982, difficulty: "Hard", category: "Geography" },
  { id: 3, title: "Science: Space Exploration", plays: 876, difficulty: "Medium", category: "Science" },
  { id: 4, title: "Video Game Characters", plays: 754, difficulty: "Easy", category: "Gaming" },
]

export default function DashboardPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-violet-50 to-purple-100 dark:from-violet-950 dark:to-purple-900">
      {/* Sidebar - Desktop */}
      <div className="hidden md:flex w-64 flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
            QuizMaster
          </h2>
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
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">john@example.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-900 shadow-lg">
            <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
              <h2 className="text-xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                QuizMaster
              </h2>
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
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
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">john@example.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between h-16 px-4 md:px-6">
            <div className="flex items-center md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                <Menu className="h-5 w-5" />
              </Button>
              <h2 className="ml-2 text-lg font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                QuizMaster
              </h2>
            </div>
            <div className="hidden md:flex md:flex-1 md:items-center md:justify-end">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search quizzes..."
                  className="py-1.5 pl-10 pr-4 block w-64 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400"
                />
              </div>
              <div className="ml-4 flex items-center space-x-3">
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-4 md:p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <Button className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700">
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
                <p className="text-xs text-green-500 mt-1">+12% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Average Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">78%</div>
                <p className="text-xs text-green-500 mt-1">+5% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Badges Earned</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">12</div>
                <p className="text-xs text-green-500 mt-1">+3 new this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Global Rank</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">#342</div>
                <p className="text-xs text-green-500 mt-1">Up 28 positions</p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="categories" className="w-full">
            <TabsList className="grid w-full md:w-auto grid-cols-3">
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="recent">Recent Quizzes</TabsTrigger>
              <TabsTrigger value="popular">Popular Quizzes</TabsTrigger>
            </TabsList>

            {/* Categories Tab */}
            <TabsContent value="categories" className="mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {quizCategories.map((category) => (
                  <Card key={category.id} className="overflow-hidden">
                    <div className={`h-2 ${category.color}`}></div>
                    <CardContent className="p-4">
                      <div className="flex items-center">
                        <div className={`p-2 rounded-full ${category.color} bg-opacity-10 mr-3`}>
                          <category.icon className={`h-5 w-5 ${category.color} text-white`} />
                        </div>
                        <div>
                          <h3 className="font-medium">{category.name}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{category.count} quizzes</p>
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
                  <CardDescription>Your quiz activity from the past month</CardDescription>
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
                            <span className="text-xs text-gray-500 dark:text-gray-400">{quiz.date}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">
                            {quiz.score}/{quiz.total}
                          </div>
                          <Progress value={(quiz.score / quiz.total) * 100} className="h-2 w-24 mt-1" />
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

            {/* Popular Quizzes Tab */}
            <TabsContent value="popular" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Popular Quizzes</CardTitle>
                  <CardDescription>Most played quizzes this week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {popularQuizzes.map((quiz) => (
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
                            <Badge className="text-xs bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-300 hover:bg-violet-100">
                              {quiz.difficulty}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-sm">{quiz.plays.toLocaleString()} plays</div>
                          <Button
                            size="sm"
                            className="mt-1 h-7 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
                          >
                            Play
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Browse All Quizzes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

