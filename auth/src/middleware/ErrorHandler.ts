import express, { NextFunction, Request, Response } from "express";
import { CustomError } from "../error/CustomError";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    // const formattedErorrs = err.errors.map((error: any) => {
    //   if (error.type === "field") {
    //     return {
    //       message: error.message,
    //       field: error.path,
    //     };
    //   }
    // });
    // return res.status(400).send({ errors: formattedErorrs });
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  console.log(err);
};
