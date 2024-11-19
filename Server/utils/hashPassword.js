
// @/src/utils/hashPassword.js
import { hash } from "argon2";

export const hashPassword = async (password) => {
  return await hash(password);
};

// @/src/utils/verifyPassword.js
import { verify } from "argon2";

export const verifyPassword = async (hash, password) => {
  return await verify(hash, password);
};

// @/src/utils/signToken.js
import jwt from "jsonwebtoken";

export const signToken = (data) => {
  return jwt.sign(data, process.env.JWT_SECRET);
};

// @/src/utils/verifyToken.js
import jwt from "jsonwebtoken";

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
