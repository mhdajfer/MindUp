"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Clock, ArrowRight, CheckCircle, XCircle } from "lucide-react";
import { generateQuiz, submitQuiz } from "@/lib/quiz-generator";
import { Question } from "@/app/types/IQuiz";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function PlayQuizPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const category = searchParams.get("category") || "general";
  const timeLimit = Number.parseInt(searchParams.get("time") || "60", 10);

  const [question, setQuestion] = useState<Question | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(timeLimit);
  const [loading, setLoading] = useState(true);

  // Generate questions on component mount
  useEffect(() => {
    const loadQuestion = async () => {
      setLoading(true);
      try {
        const generatedQuestion = await generateQuiz();

        if (generatedQuestion) {
          setQuestion(generatedQuestion);
        }
      } catch (error) {
        console.error("Failed to generate questions:", error);
      } finally {
        setLoading(false);
      }
    };

    loadQuestion();
  }, [currentQuestionIndex]);

  const handleAnswerSubmit = useCallback(
    async (answer: string | null) => {
      if (isAnswerSubmitted || !question) return;

      const finalAnswer = answer || selectedAnswer;
      const isCorrect =
        question?.options.some(
          (option) => option.isCorrect && finalAnswer === option.text
        ) || false;

      if (isCorrect) {
        setScore((prev) => prev + 1);
      }

      setIsAnswerSubmitted(true);

      if (question._id) {
        await submitQuiz(question._id, isCorrect);
      }

      if (currentQuestionIndex + 1 === 5) {
        const results = {
          quizTitle: `${
            category.charAt(0).toUpperCase() + category.slice(1)
          } Quiz`,
          score: score + (isCorrect ? 1 : 0),
          totalQuestions: 5,
          timeTaken: formatTime(timeLimit - timeRemaining),
          accuracy: Math.round(((score + (isCorrect ? 1 : 0)) / 5) * 100),
          correctAnswers: score + (isCorrect ? 1 : 0),
          incorrectAnswers: 5 - (score + (isCorrect ? 1 : 0)),
          category: category,
          difficulty: "Medium",
          completedOn: new Date().toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          }),
          xpEarned: (score + (isCorrect ? 1 : 0)) * 40,
        };

        router.push(
          `/quiz/results?data=${encodeURIComponent(JSON.stringify(results))}`
        );
        return;
      }

      // Move to next question after a delay
      setTimeout(async () => {
        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedAnswer(null);
        setIsAnswerSubmitted(false);
        setTimeRemaining(timeLimit);

        //next quiz
        await generateQuiz();
      }, 1500);
    },
    [
      category,
      currentQuestionIndex,
      isAnswerSubmitted,
      question,
      router,
      score,
      selectedAnswer,
      timeLimit,
      timeRemaining,
    ]
  );

  // Timer effect
  useEffect(() => {
    if (loading || !timeLimit) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          if (!isAnswerSubmitted) {
            handleAnswerSubmit(null);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [loading, timeLimit, isAnswerSubmitted, handleAnswerSubmit]);

  const handleAnswerSelect = (answer: string) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswer(answer);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <header className="border-b">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Link href="/">
                <div className="flex items-center gap-2">
                  <Brain className="h-8 w-8 text-primary" />
                  <h1 className="text-2xl font-bold">MindUp</h1>
                </div>
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Brain className="h-16 w-16 text-primary mx-auto animate-pulse" />
            <h2 className="text-2xl font-bold mt-4">Generating Your Quiz...</h2>
            <p className="text-muted-foreground mt-2">
              Our AI is crafting challenging questions just for you
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link href="/">
              <div className="flex items-center gap-2">
                <Brain className="h-8 w-8 text-primary" />
                <h1 className="text-2xl font-bold">MindUp</h1>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="gap-1">
              <Brain className="h-4 w-4" />
              <span className="capitalize">{category}</span>
            </Badge>
          </div>
        </div>
      </header>

      <main className="flex-1 py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="flex justify-between items-center mb-6">
                <div>
                  <span className="text-sm text-muted-foreground">
                    Question
                  </span>
                  <h2 className="text-xl font-bold">
                    {currentQuestionIndex + 1} of {5}
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Score:</span>
                  <Badge>{score}</Badge>
                </div>
                {timeLimit > 0 && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span
                      className={`font-mono ${
                        timeRemaining < 10
                          ? "text-destructive animate-pulse"
                          : ""
                      }`}
                    >
                      {formatTime(timeRemaining)}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>

            {question && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle className="text-xl">
                      {question.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {question.options.map((option) => {
                        const isSelected = selectedAnswer === option.text;
                        const isCorrect = isAnswerSubmitted && option.isCorrect;
                        const isWrong =
                          isAnswerSubmitted && isSelected && !option.isCorrect;

                        return (
                          <Button
                            key={option.text}
                            variant={"outline"}
                            className={`h-auto py-4 px-6 justify-start text-left hover:bg-violet-50 cursor-pointer ${
                              isCorrect
                                ? "bg-green-500 hover:bg-green-500 text-white"
                                : isWrong
                                ? "bg-red-500 hover:bg-red-500 text-white"
                                : isSelected
                                ? "bg-violet-200"
                                : ""
                            }`}
                            onClick={() => handleAnswerSelect(option.text)}
                            disabled={isAnswerSubmitted}
                          >
                            <div className="flex items-center gap-2 w-full">
                              <span className="flex-1">{option.text}</span>
                              {isCorrect && <CheckCircle className="h-5 w-5" />}
                              {isWrong && <XCircle className="h-5 w-5" />}
                            </div>
                          </Button>
                        );
                      })}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full gap-2 bg-violet-900 rounded-md text-white hover:bg-violet-950 cursor-pointer"
                      onClick={() => handleAnswerSubmit(selectedAnswer)}
                      disabled={!selectedAnswer || isAnswerSubmitted}
                    >
                      {isAnswerSubmitted ? "Next Question" : "Submit Answer"}
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
