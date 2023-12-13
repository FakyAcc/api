import prisma from "../DB/db.js";
import { catchAsync } from "../utils/errorUtils/catchAsync.js";
import { hidePassword } from "../utils/passwordUtils/hidePassword.js";
import AppError from "../utils/errorUtils/AppError.js";
import encrypt from "../utils/passwordUtils/encryptPassword.js";
import bcrypt from "bcryptjs";
import { validatePassword } from "../utils/passwordUtils/validatePassword.js";
import cloudinary from "../utils/uploadUtils/cloudinary.js";

export const updateUser = catchAsync(async (req, res, next) => {
  const email = req.email;
  console.log("=--=-=-=-=-=-=]");
  console.log(email);

  const body = req.body;

  const age = body.age;
  const gender = body.gender;
  const country = body.country;
  const name = body.name;
  const phone = body.phone;
  const bio = body.bio;

  const fields = {
    age: undefined,
    gender: undefined,
    country: undefined,
    name: undefined,
    phone: undefined,
    bio: undefined,
  };

  // console.log(fields.age);
  // console.log('update');

  // Only fileds we're interested in..
  Object.keys(body).forEach((key) => {
    if (fields.hasOwnProperty(key)) {
      fields[key] = body[key];
    }
  });

  let data = {};
  // filter out undefined fields
  Object.keys(fields).forEach((key) => {
    if (fields[key]) {
      data[key] = fields[key];
    }
  });

  let updatedUser = await prisma.user.update({
    where: { email },
    data: data,
  });

  updatedUser = hidePassword(updatedUser);

  res.status(200).json({
    status: "success",
    message: "fields updated successfully!",
    data: updatedUser,
  });

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>> TODO <<<<<<<<<<<<<<<<<<<<<<<<<<<<
  // Upload image.....
  const image = body.image;
});

export const updatePassword = async (req, res, next) => {
  console.log("before");
  const user = await prisma.user.findFirst({
    where: {
      email: req.user,
    },
  });

  console.log("user");
  console.log(user);
  if (!user) {
    console.log("wrong mail");
    return next(new AppError("Invalid Token", 400));
  }

  const password = user.password;
  const oldPassword = req.body.password;
  const newPassword = req.body.newPassword;

  if (!oldPassword || !newPassword) {
    return next(new AppError("Please provide password & newPassword!"));
  }

  if (!validatePassword(newPassword)) {
    return next(new AppError("Please enter a stronger password", 400));
  }

  const matchPasswords = await bcrypt.compare(oldPassword, password);

  console.log("req.user");
  console.log(req.user);
  if (matchPasswords) {
    // Update password field
    const encryptedNewPassword = await encrypt(newPassword);
    await prisma.user.update({
      where: {
        email: user.email,
      },
      data: {
        password: encryptedNewPassword,
      },
    });

    console.log("password updated successfully!");
    // res.status(200).json({
    //     status: 'success',
    //     message: 'password updated successfully!'
    // });

    next();
  } else {
    return next(new AppError("Wrong password"));
  }
};

export const deleteUser = catchAsync(async (req, res, next) => {
  const userId = req.params.userId;
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  if(!user) {
    return next(new AppError('Invalid user id.', 400));
  }

  // Delete all records that are related to table (user)
  if (user.role === "student") {
    
    await prisma.student.delete({
      where: {
        studentID: userId,
      },
    });
  }

  if (user.role === "mentor") {
    await prisma.mentor.delete({
      where: {
        mentorID: userId,
      },
    });
  }

  await prisma.verificationToken.delete({
    where: {
      userId,
    },
  });

  // Then, Delete the user itself.
  await prisma.user.delete({
    where: {
      id: userId,
    },
  });

  res.status(204).json({
    status: "success",
    message: "User deleted successfully.",
  });
});

export const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await prisma.user.findMany();
  res.status(200).json({
    status: "success",
    numberOfUsers: users.length,
    data: users,
  });
});

export const updateProfile = catchAsync(async (req, res) => {
  const { image, userId } = req.body;
  const result = await cloudinary.uploader.upload(image, {
    folder: "profilePics",
  });
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    },
  });
  res.status(200).json({
    status: "success",
    message: "Image uploaded successfully",
  });
});
