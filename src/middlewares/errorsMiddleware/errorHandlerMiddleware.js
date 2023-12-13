import AppError from "../../utils/errorUtils/AppError.js";

export const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "fail",
      message: err.message,
    });
  }

  return res.status(500).json({
    message: "Something Went Wrong, Please Try again..",
  });
};
