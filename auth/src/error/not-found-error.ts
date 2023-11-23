import { ValidationError, body, validationResult } from "express-validator";
import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
  statusCode = 404;
  reason = "Error connecting to the database";

  constructor() {
    super("Connection error");

    // Only because we are extending a built-in class
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [
      {
        message: "Not found",
      },
    ];
  }
}

// throw new RequestValidationError(errors);
