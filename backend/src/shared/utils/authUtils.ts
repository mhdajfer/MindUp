import jwt from "jsonwebtoken";
import { CustomError } from "../error/customError";
import { StatusCode } from "../Types/StatusCode";

export class AuthUtils {
  static generateToken(payload: {
    _id: string;
    fullName: string;
    email: string;
  }): string {
    const secret = process.env.SECRET_KEY;
    const expiresIn = process.env.JWT_EXPIRATION ?? "1h";

    if (!secret) {
      throw new CustomError(
        "JWT secret key is not defined",
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }

    if (!expiresIn) {
      throw new CustomError(
        "JWT expiration time is not defined",
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
    console.log(expiresIn);

    try {
      return jwt.sign(payload, secret, { expiresIn: '1h' });
    } catch (error) {
      console.log(error);
      throw new CustomError(
        "Error generating token",
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }
}
