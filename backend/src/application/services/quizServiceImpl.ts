import { QuizRepository } from "../../domain/repositories/quizRepository";
import { QuizService } from "../../domain/services/quizService";
import { IQuiz } from "../../shared/Types/IQuiz";

export class QuizServiceImpl implements QuizService {
  constructor(private _quizRepository: QuizRepository) {}
  async create(quizData: IQuiz): Promise<IQuiz> {
    try {
      return await this._quizRepository.create(quizData);
    } catch (error) {
      throw error;
    }
  }
  async findAll(): Promise<IQuiz[]> {
    try {
      return await this._quizRepository.findAll();
    } catch (error) {
      throw error;
    }
  }

  async getOne(userId: string): Promise<IQuiz> {
    try {
      return await this._quizRepository.getOne(userId);
    } catch (error) {
      throw error;
    }
  }
  findByCategory(category: string): Promise<IQuiz[]> {
    throw new Error("Method not implemented.");
  }
}
