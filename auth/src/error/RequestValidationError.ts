import { ValidationError, body, validationResult } from "express-validator";
import { CustomError } from "./CustomError";

export class RequestValidationError extends CustomError {
  statusCode = 500;

  constructor(public errors: ValidationError[]) {
    super("Invalid request parameters");

    console.error(errors);

    // Only because we are extending a built-in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((err) => {
      return {
        message: err.msg,
        field: err.type,
      };
    });
  }
}
