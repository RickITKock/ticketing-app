import cookieSession from "cookie-session";
import express from "express";
import "express-async-errors";
import http from "http";
import mongoose from "mongoose";
import { NotFoundError } from "./error/not-found-error";
import { errorHandler } from "./middleware/error-handler";
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";

const app = express();
const server = http.createServer(app);
const PORT: number = process.env.PORT ? +process.env.PORT : 3000;

app.use(express.json());
app.set("trust proxy", true);
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all("*", async (req, res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("⛁ [DB]: Connected to MongoDB");
  } catch (err) {
    console.log(err);
  }
  server.listen(PORT, () => {
    console.log(`⚡️[server]: Server is listening on port ${PORT}`);
  });
};

const shutdown = (signal: string) => {
  server.close(() => {
    console.log(`${signal} RECEIVED. Gracefully shutting down.`);
  });
};

start();

process.on("SIGINT", shutdown);
process.on("SIGHUP", shutdown);
