"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Trophy,
  Clock,
  CheckCircle2,
  Repeat,
  Home,
  Medal,
  Sparkles,
  Flame,
} from "lucide-react";

interface QuizResults {
  quizTitle: string;
  score: number;
  totalQuestions: number;
  timeTaken: string;
  accuracy: number;
  correctAnswers: number;
  incorrectAnswers: number;
  category: string;
  difficulty: string;
  completedOn: string;
  xpEarned: number;
}

export default function QuizResultsPage() {
  const router = useRouter();
  const [quizResult, setQuizResult] = useState<QuizResults | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();
  const [animationComplete, setAnimationComplete] = useState(false);
  const scoreCircleRef = useRef<SVGCircleElement>(null);

  const searchParams = useSearchParams();
  const [isGoodScore, setIsGoodScore] = useState(false);

  useEffect(() => {
    const data = searchParams.get("data");
    if (!data) {
      router.push("/quiz");
      return;
    }
    try {
      const parsedResults = JSON.parse(data);
      setQuizResult(parsedResults);
      setIsGoodScore(parsedResults.score / parsedResults.totalQuestions >= 0.7);
    } catch (error) {
      console.error("Error parsing quiz results:", error);
      router.push("/quiz");
    }
  }, [router, searchParams]);

  useEffect(() => {
    // Show confetti for good scores after a delay
    if (isGoodScore) {
      const timer = setTimeout(() => {
        setShowConfetti(true);

        // Hide confetti after 5 seconds
        const hideTimer = setTimeout(() => {
          setShowConfetti(false);
        }, 5000);

        return () => clearTimeout(hideTimer);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isGoodScore]);

  useEffect(() => {
    if (scoreCircleRef.current && !animationComplete && quizResult) {
      const scorePercentage =
        (quizResult.score / quizResult.totalQuestions) * 100;

      // Animate the circle fill
      const circle = scoreCircleRef.current;
      const radius = circle.r.baseVal.value;
      const circumference = radius * 2 * Math.PI;

      circle.style.strokeDasharray = `${circumference} ${circumference}`;
      circle.style.strokeDashoffset = `${circumference}`;

      // Trigger reflow
      circle.getBoundingClientRect();

      // Animate
      circle.style.transition = "stroke-dashoffset 2s ease-in-out";
      circle.style.strokeDashoffset = `${
        circumference - (scorePercentage / 100) * circumference
      }`;

      const timer = setTimeout(() => {
        setAnimationComplete(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [animationComplete, quizResult]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-100 dark:from-violet-950 dark:to-purple-900 pb-12">
      {/* Confetti effect for good scores */}
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.15}
          colors={[
            "#8b5cf6",
            "#a78bfa",
            "#c4b5fd",
            "#7c3aed",
            "#6d28d9",
            "#f472b6",
            "#ec4899",
          ]}
        />
      )}

      {/* Header */}
      <header className="bg-white dark:bg-gray-900 shadow-lg border-b border-violet-200 dark:border-violet-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-purple-500/10 dark:from-violet-500/20 dark:to-purple-500/20"></div>
        <div className="container mx-auto px-4 py-6 relative">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.2,
                }}
                className="mr-3"
              >
                {isGoodScore ? (
                  <div className="relative">
                    <Trophy className="h-10 w-10 text-yellow-500" />
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.5, duration: 0.5 }}
                      className="absolute -top-1 -right-1"
                    >
                      <Sparkles className="h-4 w-4 text-yellow-400" />
                    </motion.div>
                  </div>
                ) : (
                  <Medal className="h-10 w-10 text-violet-500" />
                )}
              </motion.div>
              <div>
                <motion.h1
                  className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Quiz Results
                </motion.h1>
                <motion.p
                  className="text-gray-600 dark:text-gray-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {quizResult?.quizTitle}
                </motion.p>
              </div>
            </div>

            <motion.div
              className="flex items-center space-x-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Avatar>
                <AvatarImage alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <p className="font-medium">John Doe</p>
                <p className="text-gray-500 dark:text-gray-400">
                  Completed on {quizResult?.completedOn}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Score Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Card className="overflow-hidden border-violet-200 dark:border-violet-800 shadow-lg">
            <div className="bg-gradient-to-r from-violet-600 to-purple-600 p-1"></div>
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-gray-800">
                {/* Score Circle */}
                <div className="p-6 flex flex-col items-center justify-center">
                  <div className="relative w-48 h-48 flex items-center justify-center">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      {/* Background circle */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#e2e8f0"
                        strokeWidth="8"
                      />
                      {/* Progress circle */}
                      <circle
                        ref={scoreCircleRef}
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke={isGoodScore ? "#8b5cf6" : "#a78bfa"}
                        strokeWidth="8"
                        strokeLinecap="round"
                        transform="rotate(-90 50 50)"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 20,
                          delay: 1,
                        }}
                      >
                        <div className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                          {quizResult?.score}/{quizResult?.totalQuestions}
                        </div>
                        <div className="text-center text-gray-500 dark:text-gray-400 mt-1">
                          {quizResult?.score &&
                            quizResult.totalQuestions &&
                            Math.round(
                              (quizResult.score / quizResult.totalQuestions) *
                                100
                            )}
                          % Score
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 0.5 }}
                    className="mt-4 text-center"
                  >
                    {isGoodScore ? (
                      <Badge className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white px-3 py-1 text-sm">
                        <Sparkles className="h-4 w-4 mr-1" /> Excellent Work!
                      </Badge>
                    ) : (
                      <Badge className="bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white px-3 py-1 text-sm">
                        Good Effort!
                      </Badge>
                    )}
                  </motion.div>
                </div>

                {/* Stats */}
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-4">
                    Performance Stats
                  </h3>
                  <div className="space-y-4">
                    <motion.div
                      className="flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    >
                      <Clock className="h-5 w-5 text-violet-500 mr-2" />
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">
                            Time Taken
                          </span>
                          <span className="text-sm font-medium">
                            {quizResult?.timeTaken}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                          <motion.div
                            className="bg-violet-500 h-2 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: "65%" }}
                            transition={{ delay: 0.8, duration: 1 }}
                          ></motion.div>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      className="flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7, duration: 0.5 }}
                    >
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Accuracy</span>
                          <span className="text-sm font-medium">
                            {quizResult?.accuracy}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                          <motion.div
                            className="bg-green-500 h-2 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${quizResult?.accuracy}%` }}
                            transition={{ delay: 1, duration: 1 }}
                          ></motion.div>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      className="flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9, duration: 0.5 }}
                    >
                      <Flame className="h-5 w-5 text-orange-500 mr-2" />
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">XP Earned</span>
                          <span className="text-sm font-medium">
                            {quizResult?.xpEarned} XP
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                          <motion.div
                            className="bg-orange-500 h-2 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: "75%" }}
                            transition={{ delay: 1.2, duration: 1 }}
                          ></motion.div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 flex flex-col sm:flex-row justify-center gap-4"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              className="w-full sm:w-auto bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
              size="lg"
              onClick={() => {
                router.push("/quiz");
              }}
            >
              <Repeat className="mr-2 h-5 w-5" />
              Retry Quiz
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              className="w-full sm:w-auto border-violet-300 dark:border-violet-700"
              size="lg"
              onClick={() => {
                router.push("/dashboard");
              }}
            >
              <Home className="mr-2 h-5 w-5" />
              Back to Dashboard
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
