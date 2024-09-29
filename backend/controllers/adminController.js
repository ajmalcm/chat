import { adminSecretKey } from "../app.js";
import { TryCatch } from "../middlewares/error.js";
import { Chat } from "../models/chatModel.js";
import { Message } from "../models/messageModel.js";
import { User } from "../models/userModel.js";
import { cookieOptions } from "../utils/features.js";
import { ErrorHandler } from "../utils/utility.js";
import jwt from "jsonwebtoken"


export const adminLogin=TryCatch(async(req,res,next)=>{
    const {secretKey}=req.body;

    const isMatched=secretKey===adminSecretKey;

    if(!isMatched)
    {
        return next(new ErrorHandler("Invalid admin Key",401))
    }

    const token=jwt.sign(secretKey,process.env.JWT_SECRET);

    return res.status(200).cookie("realtime_admin_accessToken",token,{...cookieOptions,maxAge:1000*60*15}).json({
        success:true,
        message:"Authenticated successfully. Welcome BOSS"
    })  //for 15 minutes

})

export const adminLogout=TryCatch(async(req,res,next)=>{
    return res.status(200).cookie("realtime_admin_accessToken","",{...cookieOptions,maxAge:0}).json({
        success:true,
        message:"Logged Out successfully"
    })  

})

export const getAdminData=TryCatch(async(req,res,next)=>{
    return res.status(200).json({
        admin:true,
    })
})

export const allUsers=TryCatch(async(req,res,next)=>{

    const users=await User.find({});

    const transformedUsers=await Promise.all(

        users.map(async({name,username,avatar,_id})=>{
            
            const [groups,friends]=await Promise.all([
                Chat.countDocuments({groupChat:true,members:_id}),
                Chat.countDocuments({groupChat:false,members:_id})
            ])
            
            return {
                name,
                username,
                avatar:avatar.url,
                _id,
                groups,
                friends
            }
        })
        
    )
        res.status(200).json({
            success:true,
            users:transformedUsers
        })


})

export const allChats=TryCatch(async(req,res,next)=>{
    const chats=await Chat.find().populate("members","name avatar").populate("creator","name avatar");

    const transformedChats=await Promise.all(chats.map(async({members,_id,groupChat,name,creator})=>{

        const totalMessages=await Message.countDocuments({chat:_id})

        return {
            _id,
            groupChat,
            name,
            avatar:members.slice(0,3).map((member)=>member.avatar.url),
            members:members.map(({_id,name,avatar})=>(
                {
                    _id,
                    name,
                    avatar:avatar.url
                }
            )),
            creator:{
                name:creator?.name || "None",
                avatar:creator?.avatar.url || ""
            },
            totalMembers:members.length,
            totalMessages
        }
    }))

    return res.status(200).json({success:true,chats:transformedChats})

})

export const allMessages=TryCatch(async(req,res,next)=>{
    const messages=await Message.find({}).populate("sender","name avatar").populate("chat","groupChat");

    const transformedMessages=messages.map(({content,attachments,_id,sender,createdAt,chat})=>(
        {
            _id,
            attachments,
            content,
            createdAt,
            chat:chat._id,
            groupChat:chat.groupChat,
            sender:{
                _id:sender._id,
                name:sender.name,
                avatar:sender.avatar.url
            }
        }
    ))

    res.status(200).json({
        success:true,
        messages:transformedMessages
    })

})

export const getDashboardStats=TryCatch(async(req,res,next)=>{
    
    const [groupsCount,usersCount,messagesCount,totalChatsCount]=await Promise.all([
        Chat.countDocuments({groupChat:true}),
        User.countDocuments(),
        Message.countDocuments(),
        Chat.countDocuments()
    ])

    const today=new Date();

    const last7Days=new Date();
     last7Days.setDate(last7Days.getDate()-7);

    const last7DaysMessages=await Message.find({
        createdAt:{
            $gte:last7Days,
            $lte:today
        }
    }).select("createdAt")

    const messages=new Array(7).fill(0);
    const dayInMiliSec=1000*60*60*24

    last7DaysMessages.forEach((message)=>{
        const indexApprox=(today.getTime()-message.createdAt.getTime())/dayInMiliSec;

        const index=Math.floor(indexApprox)
        messages[6-index]++;
    })

     const stats={
        groupsCount,
        usersCount,
        messagesCount,
        totalChatsCount,
        messagesChart:messages
     }

     return res.status(200).json({
        success:true,
        stats
     })
    
})