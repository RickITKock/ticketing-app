import { NotFoundError, currentUser, errorHandler } from "@rktickets1/common";
import cookieSession from "cookie-session";
import express from "express";
import "express-async-errors";
import { createTicketRouter } from "./routes/new";

const app = express();

app.use(express.json());
app.set("trust proxy", true);
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);
app.use(currentUser);

app.use(createTicketRouter);

app.all("*", async (req, res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
