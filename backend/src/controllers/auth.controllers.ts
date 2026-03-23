import { RequestHandler, Response } from "express";
import { LoginSchema, RegisterSchema } from "../schemas/user.schema";
import UserModel from "../models/user.model";
import { generateToken } from "../utils/jwt";
import { AuthRequest } from "../types/auth.types";

export const register: RequestHandler = async (req, res) => {
  // parse request body
  const result = RegisterSchema.parse(req.body);

  // check for email duplication
  const user = await UserModel.findOne({ email: result.email });

  if (user) {
    res.status(400).json({ message: "Email already exist" });
    return;
  }

  // add user to db
  const { _id, name, email } = await UserModel.create(result);

  // return user with token and without apssword
  res.status(201).json({
    _id,
    name,
    email,
    token: generateToken(_id.toString()),
  });
};

export const login: RequestHandler = async (req, res) => {
  const { email, password } = LoginSchema.parse(req.body);

  const user = await UserModel.findOne({ email });

  if (!user) {
    res.status(400).json({ message: "Invalid email or password" });
    return;
  }

  const isValid = await user.matchPassword(password);

  if (!isValid) {
    res.status(400).json({ message: "Invalid email or password" });
    return;
  }

  // return user with token and without apssword
  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id.toString()),
  });
};

export const me = (req: AuthRequest, res: Response) => res.json(req.user);
