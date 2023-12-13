import prisma from "../DB/db.js";
import { catchAsync } from "../utils/errorUtils/catchAsync.js";
import encrypt from "../utils/passwordUtils/encryptPassword.js";
import { generateToken } from "../utils/tokenUtils/generateJWT.js";
import dotenv from "dotenv";
import { sendEmail } from "../utils/emailUtils/sendEmail.js";
import { createEmail } from "../utils/emailUtils/createEmail.js";
import { generateVerificationToken } from "../utils/tokenUtils/generateVerificationToken.js";
import { hidePassword } from "../utils/passwordUtils/hidePassword.js";

dotenv.config({ path: "../.env" });

export const signup = catchAsync(async (req, res, next) => {
  const { email, password, role, name, phone } = req.body;

  const newUser = {
    email: email.toLowerCase(),
    password: await encrypt(password),
    role,
    name,
    phone,
    image: null,
  };
  const token = await generateVerificationToken();

  let newDbUser = await prisma.user.create({
    data: newUser,
  });

  newDbUser = hidePassword(newDbUser);

  let student, mentor;

  if (role === "student") {
    student = await prisma.student.create({
      data: {
        // user: newDbUser.id,
        studentID: newDbUser.id,
        levelOfStudent: "newbie",
      },
    });
  } else if (role === "mentor") {
    mentor = await prisma.mentor.create({
      data: {
        mentorID: newDbUser.id,
        rating: 0,
        noStudents:0,
        pricePerHour:10,
      },
    });
  }

  const tokenDB = {
    token: token,
    userId: newDbUser.id,
  };
  await prisma.verificationToken.create({ data: tokenDB });
  const isEmailSent = await sendEmail(
    newUser.email,
    "Account Verification",
    createEmail(token)
  );
  if (isEmailSent) {
    res.sendStatus(200);
    return;
  }
  res.status(200).json({
    status: "success",
    message: "User created successfully",
    user: newDbUser,
  });
});

export const login = catchAsync(async (req, res, next) => {
  const payLoad = { email: req.user.email };
  const token = generateToken(
    payLoad,
    process.env.JWT_SECRET,
    parseInt(process.env.JWT_EXPIRES_IN)
  );

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + parseInt(process.env.JWT_EXPIRES_IN)),
  });

  res.status(200).json({
    status: "success",
    message: "token sent successfully",
  });
});

export const logout = catchAsync(async (req, res, next) => {
  console.log("logout");
  console.log(req.headers.cookie);

  const payLoad = { email: req.user.email };
  const token = generateToken(payLoad, process.env.JWT_SECRET, 0);

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now()),
  });

  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
});
