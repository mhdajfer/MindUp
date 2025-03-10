import { IQuiz } from "./IQuiz";

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  avatar?: string;
  role: "user" | "admin";
  score: number;
  quizzesTaken: IQuizzesTaken[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IQuizzesTaken {
  quizId: string | IQuiz;
  score: boolean;
  takenAt: Date;
}
