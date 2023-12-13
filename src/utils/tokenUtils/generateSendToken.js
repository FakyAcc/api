import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import { generateToken } from "./generateJWT.js";

export const generateSendToken = (user, res) => {

  const payload = { email: user.email };

  const token = generateToken(
    payload,
    process.env.JWT_SECRET,
    parseInt(process.env.JWT_EXPIRES_IN)
  );

  // console.log(token);

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + 600 * 1000),
  });

  console.log("You are logged in\nToken sent successfully.");

  res.status(200).json({
    status: "success",
    message: "token sent successfully.",
  });
};
