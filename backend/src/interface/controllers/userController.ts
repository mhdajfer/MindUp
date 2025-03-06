import { NextFunction, Request, Response } from "express";
import { UserService } from "../../domain/services/userService";
import { IUser } from "../../shared/Types/IUser";
import { StatusCode } from "../../shared/Types/StatusCode";

export class UserController {
  constructor(private _userService: UserService) {}

  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const { userData }: { userData: IUser } = req.body;

      const createdUser = await this._userService.create(userData);

      res.status(StatusCode.CREATED).json({
        success: true,
        message: "User created successfully",
        data: createdUser,
      });
    } catch (error) {
      console.log("error while creating user", error);
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password }: { email: string; password: string } = req.body;


      const user = await this._userService.login(email, password);

      res.status(200).json({
        success: true,
        message: "user successfully logged in",
        data: user,
      });
    } catch (error) {
      console.log("error while logging in", error);
      next(error);
    }
  }
}
