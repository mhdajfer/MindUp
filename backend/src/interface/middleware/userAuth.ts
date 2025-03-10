import { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { CustomError } from "../../shared/error/customError";
import { StatusCode } from "../../shared/Types/StatusCode";

export default function userAuth(
  req: Request & Partial<{ user: string | jwt.JwtPayload }>,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
      throw new CustomError(
        "Authorization header missing",
        StatusCode.UNAUTHORIZED
      );
    }

    const token = authHeader.replace("Bearer ", "");

    if (!token)
      throw new CustomError("token not found", StatusCode.UNAUTHORIZED);

    if (!process.env.SECRET_KEY)
      throw new CustomError("secret key not provided", StatusCode.NOT_FOUND);

    const user = jwt.verify(token, process.env.SECRET_KEY);

    if (!user) throw new CustomError("user not found", StatusCode.UNAUTHORIZED);

    req.user = user;

    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return next(new CustomError("Token expired", StatusCode.UNAUTHORIZED));
    }

    if (error instanceof JsonWebTokenError) {
      return next(new CustomError("Invalid token", StatusCode.UNAUTHORIZED));
    }

    console.error(`Error during authentication: ${error}`);
    return next(
      new CustomError("Internal server error", StatusCode.INTERNAL_SERVER_ERROR)
    );
  }
}
