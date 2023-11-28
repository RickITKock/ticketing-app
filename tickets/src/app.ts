import { NotFoundError, errorHandler } from "@rktickets1/common";
import cookieSession from "cookie-session";
import express from "express";
import "express-async-errors";

const app = express();

app.use(express.json());
app.set("trust proxy", true);
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.all("*", async (req, res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };