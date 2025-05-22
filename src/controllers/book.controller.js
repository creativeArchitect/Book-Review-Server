import Book from '../models/Book.js';
import AppError from '../utils/AppError.js';

export const getAllBooks =  async (req, res, next)=>{
    try{
        const { author, genre, page = 1, limit = 10 } = req.query;
        const query = {};

        if (author) query.author = new RegExp(author, 'i');
        if (genre) query.genre = new RegExp(genre, 'i');

        const books = await Books.find(query)
        .skip((page-1) * limit)
        .limit(parseInt(limit))
        .populate({
            path: 'reviews',
            options: { limit: 3 }
        })

        res.status(200).json({
            success: true,
            message: "Books fetched successfully",
            count: books.length,
            books,
          });

    }catch(err){
        return next(new AppError(err.message, 500));
    }
}

export const addNewBook =  async (req, res, next)=>{
    try{
        const user = req.user;
        const { title, author, genre, description, publishedYear  } = req.body;

        if(!title || !author || !genre || !publishedYear || !description) {
            return next(new AppError("All fields are required",400));
        }

        const book = await Book.create({
            title, description, author, genre, publishedYear,
        })

        if(!book){
            return next(new AppError("Error in book creation, please try again", 400));
        }

        await book.save();

        res.status(200).json({
            success: true,
            message: "book added successfully",
            book
        })

    }catch(err){
        return next(new AppError(err.message, 500));
    }
}

export const getBook =  async (req, res, next)=>{
    try{
        const { bookId } = req.params;
        const book = await Book.findById(bookId).populate({
            path: 'reviews',
            populate: { path: 'user', select: 'name email' }
        });

        if(!book){
            return next(new AppError("Book doesn't exists", 400));
        }

        const reviews = book.reviews || [];
        const avgRating = reviews.length ? ( reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(2)  : "No ratings yet";

        res.status(200).json({
            success: true,
            message: "Book info fetched successfully.",
            book: {
              ...book.toObject(),
              averageRating,
            },
          });

    }catch(err){
        return next(new AppError(err.message, 500));
    }
}






