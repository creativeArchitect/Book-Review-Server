
import jwt from 'jsonwebtoken';

export const isLoggedIn = async (req, res, next)=>{
    const { token } = req.cookies;

    if(!token){
        return next(new Error("Unauthenticated user, please login", 401))
    }

    try{
        const userDetails = jwt.verify(token, process.env.JWT_SECRET);

        req.user = userDetails;

        next();
    }catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
      }
}















