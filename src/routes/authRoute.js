import express from "express";
import { verifyAccount } from "../middlewares/verificationMiddleware/verifyAccount.js";
import { validateUser } from "../middlewares/validationMiddleware/validateUser.js";
import { signup, login, logout } from "../controllers/authController.js";
import { verifyUser } from "../middlewares/verificationMiddleware/verifyUser.js";
import { checkLogin } from "../middlewares/authMiddleware/checkLogin.js";
import { verifyToken } from "../middlewares/authMiddleware/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/signup", checkLogin, validateUser, signup);

authRouter.post("/login", checkLogin, verifyUser, login);

authRouter.post("/verify", verifyAccount);

authRouter.post("/logout", verifyToken, logout);
export default authRouter;
