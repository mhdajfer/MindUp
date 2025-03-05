import { UserRepository } from "../../domain/repositories/userRepository";
import { IUser } from "../../shared/Types/IUser";

export class UserRepositoryImpl implements UserRepository {
  create(userData: IUser): Promise<IUser> {
    throw new Error("Method not implemented.");
  }
  findOne(email: string): Promise<IUser> {
    throw new Error("Method not implemented.");
  }
  editUser(userData: Partial<IUser>): Promise<IUser> {
    throw new Error("Method not implemented.");
  }
}
