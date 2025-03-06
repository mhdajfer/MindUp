import express, { Application } from "express";
import cors from "cors";
import userRouter from "./interface/routes/userRoute";
import errorHandler from "./interface/middleware/GlobalError";

const app: Application = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRouter);

app.use(errorHandler);

export default app;
