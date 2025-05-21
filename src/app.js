import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

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

app.use("/api/v1/user", authRoutes);
app.use("/api/v1/book", bookRoutes);
app.use("/api/v1/review", reviewRoutes);

app.use(errorMiddleware);

export default app;
