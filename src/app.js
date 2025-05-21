import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import authRoutes from "./routes/authRoutes";
import bookRoutes from "./routes/bookRoutes";
import reviewRoutes from "./routes/reviewRoutes";

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
