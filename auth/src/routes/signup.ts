import express, { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

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
  (req: Request, res: Response) => {
    const errors = validationResult(req);

    const { email, password } = req.body;

    if (!errors.isEmpty()) {
      //   return res.status(400).send(errors.array());
      throw new Error("Invalid email or password");
    }

    console.log("Creating a user...");
    throw new Error("Error connecting to database");
  }
);

export { router as signupRouter };
