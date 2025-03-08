import quiz from "../../domain/models/quiz";
import { QuizRepository } from "../../domain/repositories/quizRepository";
import { IQuiz } from "../../shared/Types/IQuiz";

export class QuizRepositoryImpl implements QuizRepository {
  async create(quizData: IQuiz): Promise<IQuiz> {
    try {
      const quizDoc = new quiz(quizData);

      return await quizDoc.save();
    } catch (error) {
      throw error;
    }
  }
  async findAll(): Promise<IQuiz[]> {
    try {
      const quizzes = await quiz.find();

      return quizzes as IQuiz[];
    } catch (error) {
      throw error;
    }
  }

  async getOne(index?: number): Promise<IQuiz> {
    try {
      console.log(index);
      if (index && index >= 0 && index < 10) {
        const quizzes = await quiz.find();

        const sortedQuizzes = quizzes.sort();
        return sortedQuizzes[index] as IQuiz;
      } else return (await quiz.findOne()) as IQuiz;
    } catch (error) {
      throw error;
    }
  }
  findByCategory(category: string): Promise<IQuiz[]> {
    throw new Error("Method not implemented.");
  }
}
