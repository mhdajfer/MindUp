export interface Question {
  questionText: string;
  options: { text: string; isCorrect: boolean }[];
}

export interface IQuiz {
  _id?: string;
  title: string;
  description?: string;
  category: string;
  questions: Question[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}
