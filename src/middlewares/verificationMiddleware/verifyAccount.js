import prisma from "../../DB/db.js";
import AppError from "../../utils/errorUtils/AppError.js";
import asyncHandler from "express-async-handler";
export const verifyAccount = asyncHandler(async (req, res, next) => {
  const { token } = req.query;
  const hashedToken = await prisma.verificationToken.findUnique({
    where: { token },
  });
  if (!hashedToken) return next(new AppError("Invalid Token", 400));
  if (hashedToken.isVerified) {
    console.log(hashedToken.userId);
    return next(new AppError("You are already verified", 409));
  } else {
    await prisma.verificationToken.update({
      where: { token: token },
      data: {
        isVerified: true,
      },
    });
    res.status(200).json({
      message: "Your account has been verified",
    });
  }
});
