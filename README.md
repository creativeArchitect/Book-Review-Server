
# Project Setup Instructions
   
   - Pre-requisites (Node.js, MongoDB)
   - How to clone the repo:
     -- git clone https://github.com/yourusername/your-repo.git
     -- cd your-repo

    - Install dependencies: npm install

    - Setup .env file (include example .env.example file in repo)

    - To start the server: npm start


# How to Run Locally

   - Mention any required environment variables
   - How to seed initial data if any
   - How to access API (e.g., http://localhost:5000/api/v1/book)


 # Database Schema Design
   - User
      -- firstName: String — User's first name (3-15 chars, lowercase)
      -- lastName: String — User's last name (3-15 chars, lowercase, optional)
      -- email: String — Unique email, validated format, lowercase
      -- password: String — Hashed password (not returned in queries)

   - Notes:
      -- Password is hashed before saving.
      -- Includes methods for JWT token generation and password comparison.

    - Book:
      -- title: String — Book title (required)
      -- author: String — Author name (required)
      -- genre: String — Genre of the book (required)
      -- description: String — Optional description
      -- publishedYear: Number — Year of publication (optional)
      -- createdBy: ObjectId — Reference to User who created the book (required)
      -- reviews (Virtual): Related reviews linked by book field in Review
      -- averageRating (Virtual): Calculated average rating from reviews

    - Review: 
      -- book: ObjectId — Reference to the reviewed Book (required)
      -- user: ObjectId — Reference to the User who made the review (required)
      -- rating: Number — Rating score (1 to 5, required)
      -- comment: String — Optional comment (max 200 chars)










