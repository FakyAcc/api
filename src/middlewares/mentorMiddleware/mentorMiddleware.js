import { catchAsync } from "../../utils/errorUtils/catchAsync.js";
import prisma from "../../DB/db.js";
import AppError from "../../utils/errorUtils/AppError.js";
export const isMentor = catchAsync(async (req, res, next) => {
  const { mentorId } = req.params;
  const mentor = await prisma.mentor.findFirst({
    where: {
      id: mentorId,
    },
  });
  if (!mentor)
    return next(
      new AppError("Only mentor are allowed to perform this action", 400)
    );
  next();
});
