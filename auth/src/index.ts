import "express-async-errors";
import http from "http";
import mongoose from "mongoose";
import { app } from "./app";

const server = http.createServer(app);
const PORT: number = process.env.PORT ? +process.env.PORT : 3000;

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
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
