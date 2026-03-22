import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";
import UserModel, { IUser } from "../models/user.model";

export interface AuthRequest extends Request {
  user?: IUser;
}

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    res.status(400).json({ message: "Not authorized" });
    return;
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token) as { id: string };

    if (!("id" in decoded)) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }

    console.log(decoded);

    const user = await UserModel.findById(decoded.id).select("-password");

    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    req.user = user;
    next();
  } catch {
    res.status(401).json({ message: "Token invalid or expired" });
  }
};
