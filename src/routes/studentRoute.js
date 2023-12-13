import { deleteStudent, getAllStudents, takeTrack, viewTracks } from "../controllers/studentController.js";
import { Router } from "express";
import { restrictTo, verifyToken } from "../middlewares/authMiddleware/authMiddleware.js";
import { checkTrack } from "../middlewares/trackMiddleware/trackMiddleware.js";
import { isStudent } from "../middlewares/studentMiddleware/studentMiddleware.js";

export const studentRouter = Router();

studentRouter.post(
  "/tracks/:trackId",
  verifyToken,
  isStudent,
  checkTrack,
  takeTrack
);
studentRouter.get("/tracks/:studentId", verifyToken, isStudent, viewTracks);
// studentRouter.post("/tracks/:trackId", verifyToken, restrictTo("admin"), takeTrack);

studentRouter.get('/', verifyToken, restrictTo('admin'), getAllStudents);


studentRouter.delete('/:studentId', verifyToken, restrictTo('admin'), deleteStudent);