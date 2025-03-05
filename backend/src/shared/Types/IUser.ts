import { Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  role: "user" | "admin";
  score: number;
  quizzesTaken: {
    quizId: Schema.Types.ObjectId;
    score: number;
    takenAt: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}
