import Review from '../models/Review.js';
import Book from '../models/Book.js';
import AppError from '../utils/error.util.js';


export const addReview = async (req, res, next)=> {
    try{
        const { bookId } = req.params;
        const { rating, comment } = req.body;

        const book = await Book.findById(bookId);

        if(!book){
            return next(new AppError("Book doesn't exists.", 400));
        }

        const existingReview = await Review.findOne({ 
            book: bookId, 
            user: req.user.id 
        });

        if(existingReview) {
        return next(new AppError("You have already reviewed this book", 400));
        }

        const review = await Review.create({
            book: bookId, rating, comment,
            user: req.user.id
        })

        res.status(200).json({
            success: true,
            message: "Review added successfully",
        })

    }catch(err){
        return next(new AppError(err.message, 500));
    }
}

export const updateReview = async (req, res, next)=> {
    try{
        const bookId = req.params.id;
        const { rating, comment } = req.body;
        const userId = req.user.id;
        console.log("BOOK id " + bookId);

        const review = await Review.findOne({ 
            book: bookId,
            user: userId 
        })


        if (!review) {
            return next(new AppError("Review not found", 404));
          }

        review.rating = rating ?? review.rating;
        review.comment = comment ?? review.comment;

        await review.save();

        res.status(200).json({
            success: true,
            message: "Review updated successfully",
            review
          });

    }catch(err){
        return next(new AppError(err.message, 500));
    }
}

export const deleteReview = async (req, res, next)=> {
    try{
        const bookId = req.params.id;
        const userId = req.user.id;

        const review = await Review.findOneAndDelete({ book: bookId, user: userId });

        if(!review){
            return next(new AppError("Review doesn't exists.", 400));
        }

        await Book.findByIdAndUpdate(bookId, {
            $pull: { reviews: review._id }
        });


        res.status(200).json({
            success: true,
            message: "Review added successfully",
            review,
        });

    }catch(err){
        return next(new AppError(err.message, 500));
    }
}