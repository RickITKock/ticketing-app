import { requireAuth, validateRequest } from "@rktickets1/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
const router = express.Router();

router.post(
  "/api/tickets",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than 0"),
  ],
  validateRequest,
  requireAuth,
  validateRequest,
  (req: Request, res: Response) => {
    console.log(req.currentUser);
    res.sendStatus(200);
  }
);

export { router as createTicketRouter };
