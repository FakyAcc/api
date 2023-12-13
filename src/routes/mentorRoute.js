import { Router } from "express";
import { verifyToken } from "../middlewares/authMiddleware/authMiddleware.js";
import { updateMentor } from "../controllers/mentorController.js";
import { isMentor } from "../middlewares/mentorMiddleware/mentorMiddleware.js";

const mentorRoute = Router();
mentorRoute.patch("/:mentorId", verifyToken, isMentor, updateMentor);
export default mentorRoute;
