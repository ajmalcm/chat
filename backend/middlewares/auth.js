import dotenv from "dotenv";
import jwt from "jsonwebtoken"
import { ErrorHandler } from "../utils/utility.js";

dotenv.config();

const jwt_secret=process.env.JWT_SECRET;
const isAuthenticatedUser=(req,res,next)=>{

    const {realtime_accessToken}=req.cookies;

    if(!realtime_accessToken)
    {
       return next(new ErrorHandler("Please Login to access this resource.",401))
    }

    const decodedData=jwt.verify(realtime_accessToken,jwt_secret)
    req.user= decodedData._id;
    next();

}

export {isAuthenticatedUser}