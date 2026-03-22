import jwt from "jsonwebtoken";
import { env } from "./env";

const jwtSecret = env.jwtSecret;

export const generateToken = (id: string) =>
  jwt.sign({ id }, jwtSecret, { expiresIn: "7d" });

export const verifyToken = (token: string) => jwt.verify(token, jwtSecret);
