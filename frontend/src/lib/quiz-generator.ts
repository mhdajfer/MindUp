import { IQuiz } from "@/app/types/IQuiz";
import { IUser } from "@/app/types/IUser";
import { Response } from "@/app/types/Response";
import { axiosInstance } from "@/utils/axios";

export async function generateQuiz() {
  try {
    const { data }: Response = await axiosInstance.get(`/quiz`);

    return data.data as IQuiz;
  } catch (error) {
    console.log("Error in generateQuiz : ", error);
    return null;
  }
}

export async function submitQuiz(quizId: string, isCorrect: boolean) {
  try {
    const { data }: Response = await axiosInstance.post("/user/submit-quiz", {
      quizId,
      isCorrect,
    });

    return data.data as IUser;
  } catch (error) {
    console.log("Error in submitQuiz : ", error);
    return null;
  }
}

export async function getRecentQuizzes() {
  try {
    const { data }: Response = await axiosInstance.get("/user/recent-quizzes");

    return data.data as IQuiz[];
  } catch (error) {
    console.log("Error in getRecentQuizzes : ", error);
    return null;
  }
}
