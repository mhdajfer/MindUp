import user from "../../domain/models/user";
import { UserRepository } from "../../domain/repositories/userRepository";
import { IUser } from "../../shared/Types/IUser";

export class UserRepositoryImpl implements UserRepository {
  async create(userData: IUser): Promise<IUser> {
    try {
      const userDoc = new user(userData);
      return await userDoc.save();
    } catch (error) {
      throw error;
    }
  }

  async findOne(email: string): Promise<IUser> {
    try {
      const userExist = await user
        .findOne({ email: email })
        .populate("quizzesTaken.quizId");

      return userExist as IUser;
    } catch (error) {
      throw error;
    }
  }
  async submitQuiz(
    quizId: string,
    userId: string,
    isCorrect: boolean
  ): Promise<IUser> {
    try {
      const updatedUser = await user.findOneAndUpdate(
        { _id: userId },
        { $push: { quizzesTaken: { quizId, score: isCorrect } } },
        { new: true }
      );

      return updatedUser as IUser;
    } catch (error) {
      throw error;
    }
  }
}
