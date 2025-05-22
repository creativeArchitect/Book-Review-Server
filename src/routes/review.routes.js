import express from 'express';
import { isLoggedIn } from '../middlewares/auth.middleware.js'



const reviewRoutes = express.Router();

reviewRoutes.post('/books/:bookId/reviews', isLoggedIn, addReview)

reviewRoutes.put('/reviews/:id', isLoggedIn, updateReview)

reviewRoutes.delete('/reviews/:id', isLoggedIn, deleteReview)

export default reviewRoutes;

