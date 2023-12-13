import prisma from "../DB/db.js";
import AppError from "../utils/errorUtils/AppError.js";
import { catchAsync } from "../utils/errorUtils/catchAsync.js";

export const updateMentor = catchAsync(async (req, res, next) => {
  const mentorId = req.params;
  const { pricePerHour, linkedIn, gitHub } = req.body;
  const dataToBeUpdated = {};
  if (pricePerHour) dataToBeUpdated["pricePerHour"] = pricePerHour;
  if (linkedIn) dataToBeUpdated["linkedIn"] = linkedIn;
  if (gitHub) dataToBeUpdated["gitHub"] = gitHub;
  const updatedMentor = await prisma.mentor.update({
    where: {
      id: mentorId,
    },
    data: dataToBeUpdated,
  });
  if (!updateMentor)
    return next(
      new AppError("Something is wrong,please try again later!", 400)
    );
  res.status(200).json({
    status: "success",
    message: "data updated successfully",
  });
});
