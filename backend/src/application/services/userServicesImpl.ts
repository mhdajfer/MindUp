import { UserRepository } from "../../domain/repositories/userRepository";
import { UserService } from "../../domain/services/userService";
import { CustomError } from "../../shared/error/customError";
import { IUser } from "../../shared/Types/IUser";
import { StatusCode } from "../../shared/Types/StatusCode";
import bcrypt from "bcryptjs";

export class UserServiceImpl implements UserService {
  constructor(private _userRepository: UserRepository) {}
  async create(userData: IUser): Promise<IUser> {
    try {
      const userExist = await this._userRepository.findOne(userData.email);

      if (userExist) {
        throw new CustomError("User already exists", StatusCode.BAD_REQUEST);
      }
      return await this._userRepository.create(userData);
    } catch (error) {
      throw error;
    }
  }

  async login(email: string, password: string): Promise<IUser> {
    try {
      const user = await this._userRepository.findOne(email);

      const isValid = await bcrypt.compare(password, user.password);

      if (!isValid) {
        throw new CustomError("Incorrect Password", StatusCode.UNAUTHORIZED);
      }

      

      return user;
    } catch (error) {
      throw error;
    }
  }
  findOne(email: string): Promise<IUser> {
    throw new Error("Method not implemented.");
  }
  editUser(userData: Partial<IUser>): Promise<IUser> {
    throw new Error("Method not implemented.");
  }
}
