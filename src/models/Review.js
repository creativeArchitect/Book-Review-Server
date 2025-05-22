
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rating: {
        type: Number,
        required: true,
        max: 5,
        min: 1
    },
    comment: {
        type: String,
        trim: true,
        maxLength: [ 200, "comment must be atmost 200 characters" ]
    }
}, { timestamps: true })

// Unique index ensures that 1 review per user per book
reviewSchema.index({ book: 1, user: 1 }, { unique: true })


const Review = mongoose.model('Review', reviewSchema);


export default Review;


