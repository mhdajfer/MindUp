import { IQuiz } from "@/app/types/IQuiz";
import { Response } from "@/app/types/Response";
import { axiosInstance } from "@/utils/axios";

export async function generateQuiz(index: number) {
  try {
    const { data }: Response = await axiosInstance.get(`/quiz/${index}`);

    return data.data as IQuiz;

    return data.data as IQuiz;
  } catch (error) {
    console.log("Error in generateQuiz : ", error);
    return null;
  }
}
