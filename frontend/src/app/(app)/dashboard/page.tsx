"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import SideBar from "@/components/SideBar";
import { useRouter } from "next/navigation";
import { IQuizzesTaken, IUser } from "../../types/IUser";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/utils/axios";
import { Response } from "../../types/Response";

export default function DashboardPage() {
  const router = useRouter();
  const [recentQuizzes, setRecentQuizzes] = useState<IQuizzesTaken[]>([]);
  const [quizCount, setQuizCount] = useState<number>(0);

  useEffect(() => {
    async function getData() {
      try {
        const { data }: Response = await axiosInstance.get("/user");

        if (data.success) {
          setQuizCount((data.data as IUser).quizzesTaken.length);
          setRecentQuizzes((data.data as IUser).quizzesTaken);
        }
      } catch (error) {
        console.log("Error in getRecentQuizzes : ", error);
      }
    }

    getData();
  }, []);
  return (
    <div className="flex min-h-screen">
      <div className="fixed h-screen">
        <SideBar />
      </div>

      <main className="p-4 md:p-6 space-y-6 w-full ml-64">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between"
        >
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <Button
            className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
            onClick={() => router.push("/quiz")}
          >
            Start New Quiz
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader className="pb-2 text-center">
                <CardTitle className="text-sm font-medium  text-gray-500 dark:text-gray-400">
                  Total Quizzes Taken
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold">{quizCount}</div>
                <p className="text-xs text-green-500 mt-1">
                  +12% from last month
                </p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader className="pb-2 text-center">
                <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Global Rank
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold">#342</div>
                <p className="text-xs text-green-500 mt-1">Up 28 positions</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-6 h-[calc(100vh-300px)] overflow-y-auto border border-gray-700 rounded-lg"
        >
          <Card>
            <CardHeader>
              <CardTitle>Your Recent Quizzes</CardTitle>
              <CardDescription>
                Your quiz activity from the past month
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentQuizzes.map((quiz, i) =>
                  typeof quiz.quizId === "object" ? (
                    <div
                      key={i}
                      className={`flex items-center ${
                        quiz.score ? "bg-green-300" : "bg-red-300"
                      } p-5 rounded-md justify-between`}
                    >
                      <div>
                        <h3 className="font-medium">{quiz.quizId.question}</h3>
                        <div className="flex items-center mt-1">
                          <Badge variant="outline" className="mr-2 text-xs">
                            {quiz.quizId.category}
                          </Badge>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {String(quiz.takenAt)}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{quiz.score ? 1 : 0}</div>
                        <Progress
                          value={(5 / 10) * 100}
                          className="h-2 w-24 mt-1"
                        />
                      </div>
                    </div>
                  ) : (
                    <h1 key={i}>No Questions taken</h1>
                  )
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All History
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
