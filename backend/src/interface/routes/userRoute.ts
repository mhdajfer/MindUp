import express from "express";
import { UserRepositoryImpl } from "../../infrastructure/repositories/userRepositoryImpl";
import { UserServiceImpl } from "../../application/services/userServicesImpl";
import { UserController } from "../controllers/userController";

const router = express.Router();

const userRepository = new UserRepositoryImpl();
const userService = new UserServiceImpl(userRepository);
const userController = new UserController(userService);

router.post("/", userController.signup.bind(userController));
router.post("/login", userController.login.bind(userController));

export default router;
