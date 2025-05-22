
import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        minLength: [3, "Name must be atleast 3 character"],
        maxLength: [15, "Name must be atleast 3 character"]
    },
    lastName: {
        type: String,
        lowercase: true,
        trim: true,
        minLength: [3, "Name must be atleast 3 character"],
        maxLength: [15, "Name must be atleast 3 character"]
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true,
        validate(val){
            if(!validator.isEmail(val)){
                throw new Error("Enter a valid email address.");
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(val){
            if(!validator.isStrongPassword(val)){
                throw new Error("Password must be 8–12 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.");
            }
        },
        select: false,
    },
})

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);
})

userSchema.methods.getJWT = function(){
    const user = this;
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY
    })

    return token;
}

userSchema.methods.comparePassword = async function(plainTextPassword){

    const isValidPassword = await bcrypt.compare(plainTextPassword, this.password);

    return isValidPassword;
}


const User = mongoose.model("User", userSchema);

export default User;

