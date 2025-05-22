import { Router } from "express";

import {
  getAllBooks,
  addNewBook,
  getBook, deleteBook
} from "../controllers/book.controller.js";

import { isLoggedIn } from "../middlewares/auth.middleware.js";

const bookRouter = Router();

bookRouter.get("/", getAllBooks);

bookRouter.post("/", isLoggedIn, addNewBook);

bookRouter.get("/:bookId", isLoggedIn, getBook);

bookRouter.delete("/:bookId", isLoggedIn, deleteBook);

export default bookRouter;
