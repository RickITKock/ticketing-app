import express, { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { DatabaseConnectionError } from "../error/database-connection-error";
import { RequestValidationError } from "../error/request-validation-error";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    const { email, password } = req.body;

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    console.log("Creating a user...");
    throw new DatabaseConnectionError();
  }
);

export { router as signupRouter };
