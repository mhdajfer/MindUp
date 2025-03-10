import { Types } from "mongoose";
import quiz from "../../domain/models/quiz";
import user from "../../domain/models/user";
import { QuizRepository } from "../../domain/repositories/quizRepository";
import { CustomError } from "../../shared/error/customError";
import { IQuiz } from "../../shared/Types/IQuiz";
import { StatusCode } from "../../shared/Types/StatusCode";

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

  async getOne(userId: string): Promise<IQuiz> {
    try {
      const newQuiz = await quiz.aggregate([
        {
          $lookup: {
            from: "users",
            pipeline: [
              {
                $match: {
                  _id: new Types.ObjectId(userId),
                },
              },
              {
                $project: {
                  attemptedQuizzes: {
                    $ifNull: ["$quizzesTaken.quizId", []],
                  },
                },
              },
            ],
            as: "userAttempt",
          },
        },
        {
          $match: {
            $expr: {
              $not: {
                $in: [
                  "$_id",
                  {
                    $ifNull: [
                      { $arrayElemAt: ["$userAttempt.attemptedQuizzes", 0] },
                      [],
                    ],
                  },
                ],
              },
            },
          },
        },
        { $sample: { size: 1 } },
      ]);

      if (!newQuiz.length) {
        throw new CustomError("No new Quizzes", StatusCode.CONFLICT);
      }
      return newQuiz[0] as IQuiz;
    } catch (error) {
      if (error instanceof CustomError) throw error;
      console.log(error);
      throw new CustomError(
        "Error fetching quiz",
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findByCategory(category: string): Promise<IQuiz[]> {
    try {
      return await quiz.find();
    } catch (error) {
      throw new CustomError(
        "Error fetching quizzes by category",
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }
}
