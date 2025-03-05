import { Schema } from "mongoose";

export interface Question {
  questionText: string;
  options: { text: string; isCorrect: boolean }[];
}

export interface IQuiz extends Document {
  title: string;
  description?: string;
  category: string;
  questions: Question[];
  createdBy: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
