import mongoose, { model, Schema, Types } from "mongoose";

const schema=new Schema({
    status:{
        type:String,
        default:"pending",
        enum:['pending','accepted','rejected']
    },
    sender:{
        type:Types.ObjectId,
        ref:"User"
    },
    reciever:{
        type:Types.ObjectId,
        ref:"User"
    }
},
{
    timestamps:true
});

export const Request=mongoose.models.Request || model("Request",schema)