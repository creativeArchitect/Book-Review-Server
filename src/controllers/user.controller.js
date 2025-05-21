
import User from '../models/User.js';
import AppError from '../utils/error.util.js';

const cookieOptions = {
    maxAge: 3*60*60*24*1000,
    httpOnly: true,
    secure: true
}

export const  register = async (req, res, next)=>{
    try{
        const { firstName, lastName, email, password } = req.body;

        if(!firstName || !lastName || !email || !password ){
            return next(new AppError("All fields are required", 400));
        }

        const userExists = await User.findOne({ email: email });

        if(userExists){
            return next(new AppError("Email is already exists", 400));
        }

        const user = await User.create({
            firstName, lastName, email, password
        })

        if(!user){
            return next(new AppError("user registration is failed, please try again", 400))
        }

        await user.save();

        user.password = undefined;

        const token = await User.getJWT();

        res.cookie('token', token, cookieOptions);

        res.status(201).json({
            success: true,
            message: 'User registered successfully.',
            user
        })

    }catch(err){
        return next(new AppError(err.message, 500));
    }
}

export const login = async (req, res, next)=>{
    try{
        const { email, password } = req.body;

        if(!email || !password){
            return next(new AppError("Enter the required fields", 400));
        }

        const user = User.findOne({ email: email }).select(password);

        if(!user || !user.comparePassword(password)){
            return next(new AppError("Invalid creadentials", 400));
        }

        const token = await user.getJWT();
        user.password = undefined;

        res.cookie('token', token, cookieOptions);

        res.status(200).json({
            success: true,
            message: "user logged in successfully.",
            user
        })

    }catch(err){
        return next(new AppError(err.message, 500));
    }
}

export const logout = async (req, res, next)=>{
    try{
        res.cookie('token', null, {
            maxAge: 0,
            secure: true,
            httpOnly: true,
        })

        res.status(200).json({
            success: true,
            message: "user logged out successfully."
        })

    }catch(err){
        return next(new AppError(err.message, 500));
    }
}

