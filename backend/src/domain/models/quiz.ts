import { model, Schema } from "mongoose";
import { IQuiz } from "../../shared/Types/IQuiz";

const QuizSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String, required: true },
    question: { type: String, required: true },
    options: [
      {
        text: { type: String, required: true },
        isCorrect: { type: Boolean, required: true },
      },
    ],

    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default model<IQuiz>("Quiz", QuizSchema);
