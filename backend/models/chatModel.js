import { Schema,models,model, Types } from "mongoose";

const Chat=new Schema({
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

module.exports=models.Chat || model("Chat",Chat);