import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-violet-50 to-purple-100 dark:from-violet-950 dark:to-purple-900">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                  QuizMaster
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Test your knowledge with our fun and challenging quizzes.
                  Compete with friends and track your progress.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/login">
                  <Button className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700">
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button
                    variant="outline"
                    className="border-violet-600 text-violet-600 hover:bg-violet-50 dark:border-violet-400 dark:text-violet-400 dark:hover:bg-violet-950"
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
