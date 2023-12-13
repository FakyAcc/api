import { catchAsync } from "../../utils/errorUtils/catchAsync.js";
import prisma from "../../DB/db.js";
import AppError from "../../utils/errorUtils/AppError.js";
export const checkTrack = catchAsync(async (req, res, next) => {
  const { trackId } = req.params;
  const track = await prisma.track.findFirst({
    where: {
      id: trackId,
    },
  });
  if (!track) return next(new AppError("There's no track with this ID", 400));
  next();
});
