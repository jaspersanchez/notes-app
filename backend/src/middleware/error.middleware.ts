import { ErrorRequestHandler } from "express";
import z, { ZodError } from "zod";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof ZodError) {
    res.status(400).json({
      message: "Missing required fields",
      error: z.flattenError(err),
    });
  }

  if (err instanceof Error) {
    console.log(err);
  }
  next();
};
