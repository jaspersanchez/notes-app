import { ErrorRequestHandler } from "express";
import z, { ZodError } from "zod";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof ZodError) {
    const error = z.prettifyError(err);

    res.status(400).json(error);
  } else {
    console.log(err);
  }

  next();
};
