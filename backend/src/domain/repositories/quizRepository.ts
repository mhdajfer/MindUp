import { IQuiz } from "../../shared/Types/IQuiz";

export interface QuizRepository {
  create(quizData: IQuiz): Promise<IQuiz>;
  findAll(): Promise<IQuiz[]>;
  findByCategory(category: string): Promise<IQuiz[]>;
  getOne(index?: number): Promise<IQuiz>;
}
