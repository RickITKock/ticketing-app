import express, { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { DatabaseConnectionError } from "./error/DatabaseConnectionError";
import { NotFoundError } from "./error/NotFoundError";
import { RequestValidationError } from "./error/RequestValidationError";

const appRouter = express.Router();

appRouter.get("/api/users/currentuser", async (req, res) => {
  res.send("Hi there!");
});

appRouter.post("/api/users/signin", async (req, res) => {
  res.send("Hi there!");
});

appRouter.post("/api/users/signout", async (req, res) => {
  res.send("Hi there!");
});

appRouter.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be a valid email address"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 6 characters long"),
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      //res.status(400).send(errors.array());
      // const error = new Error("Invalid email or password");
      // throw new RequestValidationError(errors.array()); //Error("Invalid email or password");
      return next(new RequestValidationError(errors.array()));
    }

    const { email, password } = req.body;

    console.log("Creating a user...");
    // res.send("Hi there!");

    return next(new DatabaseConnectionError());

    // throw new Error("Error connecting to database");
  }
);

appRouter.all("*", async (req: Request, res: Response, next: NextFunction) => {
  return next(new NotFoundError());
});

export default appRouter;
