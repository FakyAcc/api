import express from "express";
import {
  deleteUser,
  getAllUsers,
  updateProfile,
  updateUser,
} from "../controllers/userController.js";
import {
  restrictTo,
  verifyToken,
} from "../middlewares/authMiddleware/authMiddleware.js";
import { updatePassword } from "../controllers/userController.js";
import { logout } from "../controllers/authController.js";

const userRouter = express.Router();

userRouter.patch("/", verifyToken, updateUser);

userRouter.patch("/password", verifyToken, updatePassword, logout);

userRouter.delete("/:userId", verifyToken, restrictTo("admin"), deleteUser);

userRouter.get("/", verifyToken, restrictTo("admin"), getAllUsers);

userRouter.patch("/:userId/profile", verifyToken, updateProfile);
export default userRouter;
