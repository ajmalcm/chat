import { TryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../utils/utility.js";
import {Chat} from "../models/chatModel.js";
import { emitEvent } from "../utils/features.js";
import { ALERT, REFETCH_CHAT } from "../constants/events.js";


export const newGroupChat=TryCatch(async(req,res,next)=>{

    const {name,members}=req.body;

    if(members.length<2)
    {
        return next(new ErrorHandler("Group chat must be atleast 3 members",400))
    }

    const allMembers=[...members,req.user]

   await Chat.create({
        name,
        groupChat:true,
        creator:req.user,
        members:allMembers
    })

    emitEvent(req,ALERT,allMembers,`Welcome to ${name} group`)
    emitEvent(req,REFETCH_CHAT,members);

    res.status(201).json({
        success:true,
        message:"Group created"
    })

})