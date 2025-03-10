import { NextFunction, Request, Response } from "express";
import { QuizService } from "../../domain/services/quizService";
import { StatusCode } from "../../shared/Types/StatusCode";
import { IQuiz } from "../../shared/Types/IQuiz";
import { CustomError } from "../../shared/error/customError";
import { CustomRequest } from "../../shared/Types/CustomRequest";
import { IUser } from "../../shared/Types/IUser";

export class QuizController {
  constructor(private _quizService: QuizService) {}
  async createQuiz(req: Request, res: Response, next: NextFunction) {
    try {
      const { quizData } = req.body;

      console.log("quiz data : ", quizData);

      if (!quizData)
        throw new CustomError(
          "Please provide quiz data",
          StatusCode.BAD_REQUEST
        );

      const quiz = await this._quizService.create(quizData as IQuiz);

      res.status(StatusCode.CREATED).json({
        success: true,
        data: quiz,
        message: "Quiz created successfully",
      });
    } catch (error) {
      console.log("Error in createQuiz : ", error);
      next(error);
    }
  }

  async getOneQuiz(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const { _id } = req.user as IUser;

      const quiz = await this._quizService.getOne(_id);

      res.status(StatusCode.OK).json({
        success: true,
        data: quiz,
        message: "Quiz fetched successfully",
      });
    } catch (error) {
      console.log("Error in getOneQuiz : ", error);
      next(error);
    }
  }
}
