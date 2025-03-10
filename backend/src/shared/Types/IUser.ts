import { IQuiz } from "./IQuiz";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  avatar?: string;
  role: "user" | "admin";
  score: number;
  quizzesTaken: {
    quizId: string | IQuiz;
    score: boolean;
    takenAt: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}
