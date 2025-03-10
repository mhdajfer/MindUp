"use client";
import { IQuizzesTaken, IUser } from "@/app/types/IUser";
import { axiosInstance } from "@/utils/axios";
import React, { useEffect, useState } from "react";
import { Response } from "@/app/types/Response";

import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { format, parseISO } from "date-fns";

const Page = () => {
  const [recentQuizzes, setRecentQuizzes] = useState<IQuizzesTaken[]>([]);
  useEffect(() => {
    async function getData() {
      try {
        const { data }: Response = await axiosInstance.get("/user");

        if (data.success) {
          setRecentQuizzes((data.data as IUser).quizzesTaken);
        }
      } catch (error) {
        console.log("Error in getRecentQuizzes : ", error);
      }
    }

    getData();
  }, []);
  return (
    <div className="p-4 md:p-6 w-full ml-64">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {recentQuizzes.map((quiz, i) =>
          typeof quiz.quizId === "object" ? (
            <div
              key={i}
              className={`flex items-center ${
                quiz.score ? "bg-green-300" : "bg-red-300"
              } p-5 rounded-md justify-between mb-8`}
            >
              <div>
                <h3 className="font-medium">{quiz.quizId.question}</h3>
                <div className="flex items-center mt-1">
                  <Badge variant="outline" className="mr-2 text-xs">
                    {quiz.quizId.category || "General"}
                  </Badge>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {format(parseISO(String(quiz.takenAt)), "MMM do, yyyy")}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">{quiz.score ? 1 : 0}</div>
                <Progress value={(5 / 10) * 100} className="h-2 w-24 mt-1" />
              </div>
            </div>
          ) : (
            <h1 key={i}>No Questions taken</h1>
          )
        )}
      </motion.div>
    </div>
  );
};

export default Page;
