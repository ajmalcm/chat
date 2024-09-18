import { TryCatch } from "../middlewares/error.js";
import { Chat } from "../models/chatModel.js";
import {User} from "../models/userModel.js"
import { cookieOptions, emitEvent, sendToken } from "../utils/features.js";
import { ErrorHandler } from "../utils/utility.js";
import {Request} from "../models/requestModel.js";
import { NEW_REQUEST } from "../constants/events.js";

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
        return next(new ErrorHandler("Invalid Credentials.",404))
    }

    const isMatch=await user.comparePassword(password);

    if(!isMatch)
    {
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

export const searchUser=TryCatch(async(req,res,next)=>{
    const {name}=req.query;

    const myChats=await Chat.find({groupChat:false,members:req.user})
    
    //all users from my chat meaning friends or people i have chatted with
    const allUsersFromMyChats=myChats.flatMap((chat)=>chat.members)

    const allUsersExceptMeAndFriends=await User.find({ _id : { $nin : allUsersFromMyChats },name:{$regex: name,$options:"i"}})
    const users=allUsersExceptMeAndFriends.map(({_id,name,avatar})=>({
        _id,
        name,
        avatar:avatar.url
    }))

    res.status(200).json({success:true,users});
})

export const sendFriendRequest=TryCatch(async(req,res,next)=>{

    const {userId}=req.body;

    const request=await Request.findOne({})

    if(request) return next(new ErrorHandler("Request already sent",400));

    await Request.create({
        sender:req.user,
        reciever:userId
    })

    emitEvent(req,NEW_REQUEST,[userId],"request");

    return res.status(200).json({
        success:true,
        message:"Friend request sent."
    })

})