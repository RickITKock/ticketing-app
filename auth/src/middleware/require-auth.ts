import { NextFunction, Request, Response } from "express";
import { CustomError } from "../error/custom-error";
import { NotAuthorizedError } from "../error/not-authorized-error";

export const requireAuth = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.currentUser);
  console.log("Hello world!!!!");

  if (!req.currentUser) throw new NotAuthorizedError();
  next();
};
