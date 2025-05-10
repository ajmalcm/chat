import { TryCatch } from "../middlewares/error.js";
import { Chat } from "../models/chatModel.js";
import {User} from "../models/userModel.js"
import { cookieOptions, emitEvent, sendToken, uploadFilesToCloudinary } from "../utils/features.js";
import { ErrorHandler } from "../utils/utility.js";
import {Request} from "../models/requestModel.js";
import { NEW_REQUEST, REFETCH_CHAT } from "../constants/events.js";
import { getOtherMember } from "../lib/helper.js";

export const registerUser=TryCatch(async (req, res, next) => {
    const { name, username, password, bio } = req.body;
  
    const file = req.file;
  
    if (!file) return next(new ErrorHandler("Please Upload Avatar"));
  
    const result = await uploadFilesToCloudinary([file]);
  
    const avatar = {
      public_id: result[0].public_id,
      url: result[0].url,
    };
  
    const user = await User.create({
      name,
      bio,
      username,
      password,
      avatar,
    });
  
    sendToken(res, user, 201, "User created");
  });

export const login=TryCatch(async(req,res,next)=>{
    const {username,password}=req.body;

    const user=await User.findOne({username}).select("+password");

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

    if(!user) return next(new ErrorHandler("user not found.",404))

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

    const request=await Request.findOne({
        $or:[
            {sender:req.user,reciever:userId},
            {sender:userId,reciever:req.user}
        ]
    })

    if(request) return next(new ErrorHandler("Request already sent",400));

    await Request.create({
        sender:req.user,
        reciever:userId
    })

    emitEvent(req,NEW_REQUEST,[userId]);

    return res.status(200).json({
        success:true,
        message:"Friend request sent."
    })

})

export const acceptFriendRequest=TryCatch(async(req,res,next)=>{

    const {requestId,accept}=req.body;

    const request=await Request.findById(requestId).populate("sender","name").populate("reciever","name");

    if(!request) return next(new ErrorHandler("Request not found",404));

    if(request.reciever._id.toString()!==req.user.toString())
    {
        return next(new ErrorHandler("You are not authorized to accept this request",401))
    }

    if(!accept)
    {
        await request.deleteOne();
        return res.status(200).json({
            success:true,
            message:"friend request rejected."
        })
    }

    const members=[request.sender._id,request.reciever._id];

    await Promise.all([
        Chat.create({members,name:`${request.sender.name}-${request.reciever.name}`}),
        request.deleteOne()
    ])

    emitEvent(req,REFETCH_CHAT,members);

    return res.status(200).json({
        success:true,
        message:"Friend request Accepted.",
        senderId:request.sender._id
    })

})

export const getAllNotifications=TryCatch(async(req,res,next)=>{
    const requests=await Request.find({reciever:req.user}).populate("sender","name avatar");

    const allRequests=requests.map(({_id,sender})=>({
        _id,sender:{
            _id:sender._id,
            name:sender.name,
            avatar:sender.avatar.url
        },
    }))


    return res.status(200).json({
        success:true,
        allRequests
    })

})

export const getMyFriends=TryCatch(async(req,res,next)=>{
    const chatId=req.query.chatId;

    const chats=await Chat.find({members:req.user,groupChat:false}).populate("members","name avatar");

    const friends=chats.map(({members})=>{
        const otherUser=getOtherMember(members,req.user)

        return {
            _id:otherUser._id,
            name:otherUser.name,
            avatar:otherUser.avatar.url
        }

    })

    if(chatId)
    {
        const chat=await Chat.findById(chatId);

        const availableFriends=friends.filter((friend)=>!chat.members.includes(friend._id));

        res.status(200).json({
            success:true,
            friends:availableFriends
        })

    }
    else{
        return res.status(200).json({
            success:true,
            friends
        })
    }

})