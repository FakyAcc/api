import jwt from "jsonwebtoken";
import prisma from "../../DB/db.js";
import AppError from "../../utils/errorUtils/AppError.js";

export const verifyToken = async (req, res, next) => {
  let authHeader = req.headers.authorization || req.headers.cookie;

  
  if (authHeader) authHeader = authHeader.toString();
  console.log(req.headers);
  console.log(authHeader);
  if (authHeader == null) {
    return res.status(401).json({
      message: "You are not unauthorized",
    });
  }

  let token = authHeader;
  if (authHeader.startsWith("jwt=")) {
    token = authHeader.split("=")[1];
  }

  console.log(token);
  jwt.verify(token, process.env.JWT_SECRET, async (err, userID) => {
    console.log('user id = ');
    console.log(userID);
    if (err)
      return res.status(403).json({
        status: "fail",
        message: "UnAuthorized, login first!",
        error: err,
      });
    req.email = userID.email;
    const user = await prisma.user.findFirst({
      where: {
        email: userID.email,
      },
    });
    req.user = user;
    console.log(req.user);
    console.log("end");
    next();
  });
};

export const generateAccessToken = (userID) =>
  jwt.sign(userID, process.env.JWT_SECRET);

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      next(
        new AppError(
          `You dont't have permission to perform this operation`,
          403
        )
      );
    }
    next();
  };
};
