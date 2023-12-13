import validator from "validator";
import prisma from "../../DB/db.js";
import { catchAsync } from "../../utils/errorUtils/catchAsync.js";
const checkPassword = (password) => {
  if (password.length < 5) return false;
  return true;
};
const checkConfirmPassword = (password, confirmPassword) => {
  return password === confirmPassword;
};
export const validateUser = catchAsync(async (req, res, next) => {
  console.log("hello");
  const { email, password, confirmPassword, name, role, phone } = req.body;
  if (!email || !password || !confirmPassword || !name || !role || !phone)
    return res.status(400).json({
      status: "fail",
      message: "please fill all required fields",
    });
  if (!validator.isEmail(email))
    return res.status(400).json({
      status: "fail",
      message: "please enter a valid email",
    });
  if (!validator.isNumeric(phone)) {
    return res.status(400).json({
      status: "fail",
      message: "please enter a valid phone number",
    });
  }
  // if (!validator.isNumeric(age)) {
  //   return res.status(400).json({
  //     status: "failed",
  //     message: "please enter a valid phone number",
  //   });
  // }
  if (!checkPassword(password)) {
    return res.status(400).json({
      status: "fail",
      message: "please enter a strong password (at least 5 characters)",
    });
  }
  if (!checkConfirmPassword(password, confirmPassword)) {
    return res.status(400).json({
      status: "fail",
      message: "password and confirmPassword don't match",
    });
  }
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (user) {
    return res.status(400).json({
      status: "fail",
      message: "This email is already associated with another user!",
    });
  }
  next();
});
