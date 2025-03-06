import { model, Schema, Types } from "mongoose";
import { IUser } from "../../shared/Types/IUser";
import bcrypt from "bcryptjs";

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

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const saltRounds = 10;
  bcrypt.hash(this.password, saltRounds, (err, hash) => {
    if (err) {
      return next(err);
    }
    this.password = hash as string;
    next();
  });
});

export default model<IUser>("User", userSchema);
