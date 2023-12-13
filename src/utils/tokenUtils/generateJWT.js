import jwt from "jsonwebtoken";

export const generateToken = (payload, secret, expiresIn) => {
  if (!payload || !secret || !expiresIn) return;
  return jwt.sign(payload, secret, {
    expiresIn
  });
};  
