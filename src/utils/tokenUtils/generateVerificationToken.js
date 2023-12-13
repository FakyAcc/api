import crypto from "crypto";
import bcrypt from "bcrypt";
export const generateVerificationToken = async () => {
  let token = crypto.randomBytes(32).toString("hex");
  const salt = await bcrypt.genSalt(10);
  token = await bcrypt.hash(token, salt);
  return Buffer.from(token).toString("base64url");
};
