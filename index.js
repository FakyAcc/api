import express from "express";
import dotenv from "dotenv";
import prisma from "./src/DB/db.js";
dotenv.config({ path: ".env" });
import userRouter from "./src/routes/userRoute.js";
import authRouter from "./src/routes/authRoute.js";
import trackRouter from "./src/routes/trackRoute.js";
import globalErrorHandler from "./src/middlewares/errorsMiddleware/globalErrorMiddleware.js";
import { errorHandlerMiddleware } from "./src/middlewares/errorsMiddleware/errorHandlerMiddleware.js";
import { studentRouter } from "./src/routes/studentRoute.js";
import cookieParser from "cookie-parser";
import mentorRoute from "./src/routes/mentorRoute.js";
const app = express();

app.use(cookieParser()); // NOTE: using this module without () will hang your application!!!!!!!!!!

app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/tracks", trackRouter);
app.use("/api/v1/students", studentRouter);
app.use("/api/v1/mentors" , mentorRoute);
app.use(errorHandlerMiddleware);

app.use(globalErrorHandler);
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("Server is listening on port " + port);
});
