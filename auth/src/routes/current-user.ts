import { currentUser, requireAuth } from "@rktickets1/common";
import express, { NextFunction, Request, Response } from "express";

const router = express.Router();

router.get(
  "/api/users/currentuser",
  currentUser,
  (req: Request, res: Response) => {
    res.send({ currentUser: req.currentUser || null });
  }
);

export { router as currentUserRouter };
