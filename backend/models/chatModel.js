import mongoose,{model, Types } from "mongoose";

const schema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    groupChat:{
        type:Boolean,
        default:false
    },
    creator:{
        type:Types.ObjectId,
        ref:"User"
    },
    members:[
        {
        type:Types.ObjectId,
        ref:"User" 
        }
    ],
},{
    timestamps:true
})

export const Chat=mongoose.models.Chat || model("Chat",schema);