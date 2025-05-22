
import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    genre: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    publishedYear: {
      type: Number,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  })

// Virtual field for average rating
bookSchema.virtual('averageRating').get(function (){
    if(!this.reviews || this.reviews.length === 0) return 0;

    const total = this.reviews.reduce((acc, review)=> acc + review.rating, 0);
})

//  virtual for reviews (populate later)
bookSchema.virtual('reviews', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'book'
})

const Book = mongoose.model("Book", bookSchema);

export default Book;

