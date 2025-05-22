import { Router } from "express";

import {
  getAllBooks,
  addNewBook,
  getBook,
} from "../controllers/book.controller.js";

import { isLoggedIn } from "../middlewares/auth.middleware.js";

const bookRouter = Router();

bookRouter.get("/", getAllBooks);

bookRouter.post("/", isLoggedIn, addNewBook);

bookRouter.get("/:bookId", getBook);

export default bookRouter;
