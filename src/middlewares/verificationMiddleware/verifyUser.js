import prisma from "../../DB/db.js";
import AppError from "../../utils/errorUtils/AppError.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import { generateSendToken } from "../../utils/tokenUtils/generateSendToken.js";
import { catchAsync } from "../../utils/errorUtils/catchAsync.js";

export const verifyUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("please fill in all required fields.", 400));
  }
  if (!validator.isEmail(email)) {
    console.log(email);
    return next(new AppError("please enter a valid email.", 400));
  }
  const user = await prisma.user.findUnique({
    where: {
      email: email.toLowerCase(),
    },
  });
  if (!user) {
    return next(new AppError("email or password is not correct.", 400));
  }
  const matchPasswords = await bcrypt.compare(password, user.password);
  if (!matchPasswords) {
    return next(new AppError("email or password is not correct.", 400));
  }
  const token = await prisma.verificationToken.findFirst({
    where: { userId: user.id },
  });
  if (token.isVerified == false)
    return next(new AppError("please verify your email first", 400));
  req.user = user;
  next();
});
