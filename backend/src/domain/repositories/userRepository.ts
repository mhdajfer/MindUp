import { IUser } from "../../shared/Types/IUser";

export interface UserRepository {
  create(userData: IUser): Promise<IUser>;
  findOne(email: string): Promise<IUser>;
  submitQuiz(quizId: string, userId: string, isCorrect: boolean): Promise<IUser>;
}
