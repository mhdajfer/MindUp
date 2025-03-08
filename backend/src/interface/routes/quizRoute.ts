import express from "express";
import { QuizRepositoryImpl } from "../../infrastructure/repositories/quizRepositoryImpl";
import { QuizServiceImpl } from "../../application/services/quizServiceImpl";
import { QuizController } from "../controllers/quizController";

const router = express.Router();

const quizRepository = new QuizRepositoryImpl();
const quizService = new QuizServiceImpl(quizRepository);
const quizController = new QuizController(quizService);

router.post("/", quizController.createQuiz.bind(quizController));
router.get("/:index", quizController.getOneQuiz.bind(quizController));

export default router;
