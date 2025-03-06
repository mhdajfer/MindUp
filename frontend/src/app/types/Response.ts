import { AxiosResponse } from "axios";
import { IUser } from "./IUser";
import { IQuiz } from "./IQuiz";

export interface Response extends AxiosResponse {
  data: { success: boolean; message: string; data: IUser | IQuiz };
}
