"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Brain, Clock, ArrowRight, CheckCircle, XCircle } from "lucide-react";
import { generateQuiz } from "@/lib/quiz-generator";
import { Question } from "@/app/types/IQuiz";
import { toast } from "sonner";

export default function PlayQuizPage() {
  const searchParams = useSearchParams();

  const category = searchParams.get("category") || "general";
  const count = Number.parseInt(searchParams.get("count") || "10", 10);
  const timeLimit = Number.parseInt(searchParams.get("time") || "60", 10);

  const [question, setQuestion] = useState<Question | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(timeLimit);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  // Generate questions on component mount
  useEffect(() => {
    const loadQuestion = async () => {
      setLoading(true);
      try {
        const generatedQuestion = await generateQuiz(currentQuestionIndex);

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
    (answer: string | null) => {
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

      if (currentQuestionIndex + 1 === 3) return toast.success("Quiz Completed!");

      // Move to next question after a delay
      setTimeout(() => {
        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedAnswer(null);
        setIsAnswerSubmitted(false);
        setTimeRemaining(timeLimit);
        generateQuiz(currentQuestionIndex);
        toast.info("Moving to next qstn.");

        // setQuizCompleted(true);
      }, 1500);
    },
    [
      currentQuestionIndex,
      isAnswerSubmitted,
      question,
      selectedAnswer,
      timeLimit,
    ]
  );

  // Timer effect
  useEffect(() => {
    if (loading || quizCompleted || !timeLimit) return;

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
  }, [
    loading,
    quizCompleted,
    timeLimit,
    isAnswerSubmitted,
    handleAnswerSubmit,
  ]);

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
                  <h1 className="text-2xl font-bold">BYTEBATTLE</h1>
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

  // if (quizCompleted) {
  //   const percentage = Math.round((score / questions.length) * 100);

  //   return (
  //     <div className="min-h-screen flex flex-col">
  //       <header className="border-b">
  //         <div className="container mx-auto px-4 py-4 flex justify-between items-center">
  //           <div className="flex items-center gap-2">
  //             <Link href="/">
  //               <div className="flex items-center gap-2">
  //                 <Brain className="h-8 w-8 text-primary" />
  //                 <h1 className="text-2xl font-bold">BYTEBATTLE</h1>
  //               </div>
  //             </Link>
  //           </div>
  //         </div>
  //       </header>

  //       <main className="flex-1 py-12">
  //         <div className="container mx-auto px-4">
  //           <div className="max-w-2xl mx-auto">
  //             <Card className="overflow-hidden">
  //               <div
  //                 className="bg-primary h-2"
  //                 style={{ width: `${percentage}%` }}
  //               ></div>
  //               <CardHeader className="text-center">
  //                 <CardTitle className="text-3xl">Quiz Completed!</CardTitle>
  //               </CardHeader>
  //               <CardContent className="space-y-6">
  //                 <div className="flex justify-center">
  //                   {percentage >= 70 ? (
  //                     <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center">
  //                       <CheckCircle className="h-12 w-12 text-green-500" />
  //                     </div>
  //                   ) : (
  //                     <div className="h-24 w-24 rounded-full bg-amber-100 flex items-center justify-center">
  //                       <Brain className="h-12 w-12 text-amber-500" />
  //                     </div>
  //                   )}
  //                 </div>

  //                 <div className="text-center">
  //                   <h3 className="text-2xl font-bold">Your Score</h3>
  //                   <p className="text-5xl font-bold my-4">
  //                     {score} / {questions.length}
  //                     <span className="text-lg text-muted-foreground ml-2">
  //                       ({percentage}%)
  //                     </span>
  //                   </p>
  //                   <p className="text-muted-foreground">
  //                     {percentage >= 90
  //                       ? "Outstanding! You're a true expert!"
  //                       : percentage >= 70
  //                       ? "Great job! You know your stuff!"
  //                       : percentage >= 50
  //                       ? "Good effort! Keep learning!"
  //                       : "Keep practicing! You'll improve with time!"}
  //                   </p>
  //                 </div>

  //                 <div className="border rounded-lg p-4 bg-muted/30">
  //                   <h4 className="font-semibold mb-2">Quiz Details</h4>
  //                   <div className="grid grid-cols-2 gap-2 text-sm">
  //                     <div>Category:</div>
  //                     <div className="font-medium capitalize">{category}</div>
  //                     <div>Difficulty:</div>
  //                     <div className="font-medium capitalize">{difficulty}</div>
  //                     <div>Questions:</div>
  //                     <div className="font-medium">{questions.length}</div>
  //                     <div>Time Limit:</div>
  //                     <div className="font-medium">
  //                       {timeLimit ? `${timeLimit} seconds` : "No limit"}
  //                     </div>
  //                   </div>
  //                 </div>
  //               </CardContent>
  //               <CardFooter className="flex flex-col sm:flex-row gap-4">
  //                 <Button
  //                   variant="outline"
  //                   className="w-full sm:w-auto"
  //                   onClick={() => router.push("/quiz/new")}
  //                 >
  //                   New Quiz
  //                 </Button>
  //                 <Button
  //                   className="w-full sm:w-auto"
  //                   onClick={() => router.push("/")}
  //                 >
  //                   Back to Home
  //                 </Button>
  //               </CardFooter>
  //             </Card>
  //           </div>
  //         </div>
  //       </main>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link href="/">
              <div className="flex items-center gap-2">
                <Brain className="h-8 w-8 text-primary" />
                <h1 className="text-2xl font-bold">BYTEBATTLE</h1>
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
            <div className="flex justify-between items-center mb-6">
              <div>
                <span className="text-sm text-muted-foreground">Question</span>
                <h2 className="text-xl font-bold">
                  {currentQuestionIndex + 1} of {10}
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
                      timeRemaining < 10 ? "text-destructive animate-pulse" : ""
                    }`}
                  >
                    {formatTime(timeRemaining)}
                  </span>
                </div>
              )}
            </div>

            <Progress
              value={(currentQuestionIndex / 10) * 100}
              className="mb-8"
            />

            {question && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="text-xl">{question.question}</CardTitle>
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
                          variant={isSelected ? "default" : "outline"}
                          className={`h-auto py-4 px-6 justify-start text-left ${
                            isCorrect
                              ? "bg-green-500 hover:bg-green-500 text-white"
                              : isWrong
                              ? "bg-red-500 hover:bg-red-500 text-white"
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
                    className="w-full gap-2"
                    onClick={() => handleAnswerSubmit(selectedAnswer)}
                    disabled={!selectedAnswer || isAnswerSubmitted}
                  >
                    {isAnswerSubmitted ? "Next Question" : "Submit Answer"}
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
