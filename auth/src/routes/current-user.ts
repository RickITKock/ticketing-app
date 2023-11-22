import express, { NextFunction, Request, Response } from "express";

const router = express.Router();

router.get("/api/users/currentuser", (req, res) => {
  res.send("Hi there!");
});

export { router as currentUserRouter };
