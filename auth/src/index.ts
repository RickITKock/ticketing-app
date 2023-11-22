import express from "express";
import http from "http";
import { errorHandler } from "./middleware/error-handler";
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";

const app = express();
const server = http.createServer(app);
const PORT: number = process.env.PORT ? +process.env.PORT : 3000;

app.use(express.json());
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.use(errorHandler);

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
