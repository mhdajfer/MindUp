import { IUser } from "../../shared/Types/IUser";

export interface UserService {
  create(userData: IUser): Promise<IUser>;
  findOne(email: string): Promise<IUser>;
  login(
    email: string,
    password: string
  ): Promise<{ user: IUser; accessToken: string }>;
  editUser(userData: Partial<IUser>): Promise<IUser>;
}
