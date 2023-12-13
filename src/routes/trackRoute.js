import express from "express";
import { verifyToken } from "../middlewares/authMiddleware/authMiddleware.js";
import { restrictTo } from "../middlewares/authMiddleware/authMiddleware.js";
import {
  createTrack,
  updateTrack,
  deleteTrack,
  getTrack,
  getAllTracks,
} from "../controllers/trackController.js";
const trackRouter = express.Router();

// >>>>>>>>>>>>>>>>>>>>>>>>>>> ONLY FOR ADMINS <<<<<<<<<<<<<<<<<<<<<<<<<<<<
// Except "getTrack"

trackRouter.post("/", verifyToken, restrictTo("admin"), createTrack);

trackRouter
  .route("/:trackId")
  .patch(verifyToken, restrictTo("admin"), updateTrack)
  .delete(verifyToken, restrictTo("admin"), deleteTrack)
  .get(getTrack);

trackRouter.get('/', getAllTracks);
export default trackRouter;
