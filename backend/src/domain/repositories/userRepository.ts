import { IUser } from "../../shared/Types/IUser";

export interface UserRepository {
  create(userData: IUser): Promise<IUser>;
  findOne(email: string): Promise<IUser>;
  editUser(userData: Partial<IUser>): Promise<IUser>;
}
