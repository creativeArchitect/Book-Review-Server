import express from 'express';
import { isLoggedIn } from '../middlewares/auth.middleware.js'
import { addReview, updateReview, deleteReview } from '../controllers/reviews.controller.js';


const reviewRoutes = express.Router();

reviewRoutes.post('/:bookId', isLoggedIn, addReview)

reviewRoutes.put('/:id', isLoggedIn, updateReview)

reviewRoutes.delete('/:id', isLoggedIn, deleteReview)

export default reviewRoutes;

