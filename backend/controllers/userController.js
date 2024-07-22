import { TryCatch } from "../middlewares/error.js";
import {User} from "../models/userModel.js"
import { cookieOptions, sendToken } from "../utils/features.js";
import { ErrorHandler } from "../utils/utility.js";

export const registerUser=async(req,res,next)=>{
    const {name,username,password,bio}=req.body;

    const avatar={
        public_id:"rando",
        url:"randourl"
    }

    const user=await User.create({name,username,password,bio,avatar});

    sendToken(res,user,201,"User created successfully");
}

export const login=TryCatch(async(req,res,next)=>{
    const {username,password}=req.body;

    const user=await User.findOne({username}).select("password");

    if(!user){
        // return res.status(401).json({success:false,message:"Invalid Credentials"})
        return next(new ErrorHandler("Invalid Credentials.",404))
    }

    const isMatch=await user.comparePassword(password);

    if(!isMatch)
    {
        // return res.status(401).json({success:false,message:"Invalid Credentials"});
        return next(new ErrorHandler("Invalid Credentials.",404));
    }

    sendToken(res,user,200,"Login successfull.");

})

export const getUserProfile=TryCatch(async(req,res,next)=>{
    const user=await User.findById(req.user);

    res.status(200).json({success:true,user})

})

export const logoutUser=TryCatch(async(req,res,next)=>{

    res.status(200).cookie("realtime_accessToken","",{...cookieOptions,maxAge:0}).json({success:true,message:"logout Sucessfull."});
})