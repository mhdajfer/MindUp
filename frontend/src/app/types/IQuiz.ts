export interface IQuiz {
  _id?: string;
  category: string;
  question: string;
  options: { text: string; isCorrect: boolean }[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Question {
  _id?: string;
  question: string;
  options: { text: string; isCorrect: boolean }[];
  createdAt: Date;
  updatedAt: Date;
}
