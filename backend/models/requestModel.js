import { Schema,models,model, Types } from "mongoose";

const Request=new Schema({
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

module.exports=models.Request || model("Request",Request)