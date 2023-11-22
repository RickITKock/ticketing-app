import express from "express";
import http from "http";
import mongoose from "mongoose";

import appRouter from "./appRouter";
import { errorHandler } from "./middleware/ErrorHandler";

const app = express();
app.use(express.json());

app.use(appRouter);
app.use(errorHandler);

const PORT: number = process.env.PORT ? +process.env.PORT : 3000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`⚡️[server]: Server is listening on port ${PORT}`);
});

const shutdown = (signal: string) => {
  server.close(() => {
    console.log(`${signal} RECEIVED. Gracefully shutting down.`);
  });
};

process.on("SIGINT", shutdown);
process.on("SIGHUP", shutdown);
