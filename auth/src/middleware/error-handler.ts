import express, { NextFunction, Request, Response } from "express";
import { CustomError } from "../error/custom-error";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    console.error(err);
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  res.status(400).send({ message: "Something went wrong" });
};
