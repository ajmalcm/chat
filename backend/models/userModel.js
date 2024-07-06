import { model, models, Schema } from "mongoose";

const User=new Schema({
    name:{
        type:String,
        required:[true,"name cannot be empty"],  
    },
    username:{
        type:String,
        required:[true,"username cannot be empty"],
        unique:true,
    },
    password:{
        type:String,
        required:[true,"password cannot be empty"],
        select:false,
        minLength:[8,"password cannot be less than 8 characters"]
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    }
},{
    timestamps:true
})

module.exports=models.User || model("User",User);