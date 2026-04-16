import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is missing");
  }

  return jwt.sign({ userId }, secret, { expiresIn: "7d" });
};

export default generateToken;
