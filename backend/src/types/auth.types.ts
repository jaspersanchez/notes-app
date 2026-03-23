import { Request } from "express";
import { IUser } from "../models/user.model";

export interface AuthRequest extends Request {
  user?: IUser;
}

export interface AuthRequestWithId extends AuthRequest {
  params: { id: string };
}
