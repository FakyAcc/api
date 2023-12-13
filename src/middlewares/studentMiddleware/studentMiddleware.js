import { catchAsync } from "../../utils/errorUtils/catchAsync.js";
import prisma from "../../DB/db.js";
import AppError from "../../utils/errorUtils/AppError.js";
export const isStudent = catchAsync(async (req, res, next) => {
  const id = req.user.id;
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  if (user.role != "student")
    return next(
      new AppError("You are not allowed to perform this action", 401)
    );
  next();
});
