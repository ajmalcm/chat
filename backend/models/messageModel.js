import { Schema,models,model, Types } from "mongoose";

const Message=new Schema({
    content:String,
    attachments:[
        {
            public_id:
            {
            type:String,
            required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    sender:{
        type:Types.ObjectId,
        ref:"User",
        required:true
    },
    chat:{
        type:Types.ObjectId,
        ref:"Chat",
        required:true
    }

},{
    timestamps:true
});

module.exports=models.Message || model("Message",Message);