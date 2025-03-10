import { IQuiz } from "../../shared/Types/IQuiz";
import { IUser } from "../../shared/Types/IUser";

export interface QuizService {
  create(quizData: IQuiz): Promise<IQuiz>;
  findAll(): Promise<IQuiz[]>;
  findByCategory(category: string): Promise<IQuiz[]>;
  getOne(userId: string): Promise<IQuiz>;
}
