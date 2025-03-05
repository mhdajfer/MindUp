import { model, Schema, Types } from "mongoose";
import { IUser } from "../../shared/Types/IUser";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: { type: String },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    score: { type: Number, default: 0 },
    quizzesTaken: [
      {
        quizId: { type: Types.ObjectId, ref: "Quiz" },
        score: { type: Number, required: true },
        takenAt: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model<IUser>("User", userSchema);
