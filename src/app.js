import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import userRoutes from "./routes/user.routes.js";
import bookRoutes from "./routes/book.routes.js";
import reviewRoutes from "./routes/review.routes.js";

import errorMiddleware from './middlewares/error.middleware.js'

const app = express();

dotenv.config();

app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(morgan("dev"));

app.get("/ping", (req, res) => {
  res.send("Pong...");
});

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/book", bookRoutes);
app.use("/api/v1/review", reviewRoutes);

app.use(errorMiddleware);

export default app;
