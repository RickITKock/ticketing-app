import express, { NextFunction, Request, Response } from "express";

const router = express.Router();

router.post("/api/users/signin", (req, res) => {
  res.send("Hi there!");
});

export { router as signinRouter };
