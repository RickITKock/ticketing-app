import { requireAuth, validateRequest } from "@rktickets1/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
const router = express.Router();

router.post(
  "/api/tickets",
  requireAuth,
  validateRequest,
  (req: Request, res: Response) => {
    console.log(req.currentUser);
    res.sendStatus(200);
  }
);

export { router as createTicketRouter };
