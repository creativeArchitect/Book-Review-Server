import { Router } from "express";

import { getAllBooks, addNewBook, getBook } from "../controllers/book.controller";

import { isLoggedIn } from '../middlewares/auth.middleware.js'

const bookRouter = Router();

bookRouter.get('/books', getAllBooks)

bookRouter.post('/books', isLoggedIn, addNewBook)

bookRouter.get('/books/:bookId', getBook)



export default bookRouter;