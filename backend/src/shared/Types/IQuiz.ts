import { Schema } from "mongoose";

export interface IQuiz extends Document {
  category: string;
  question: string;
  options: { text: string; isCorrect: boolean }[];
  createdAt: Date;
  updatedAt: Date;
}
