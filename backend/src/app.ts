import express, { Application } from "express";
import cors from "cors";
import userRouter from "./interface/routes/userRoute";
import quizRouter from "./interface/routes/quizRoute";
import errorHandler from "./interface/middleware/GlobalError";

const app: Application = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRouter);
app.use("/api/quiz", quizRouter);

app.use(errorHandler);

export default app;
