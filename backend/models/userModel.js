import mongoose,{ model, Schema } from "mongoose";
import bcrypt from "bcrypt";

const schema=new Schema({
    name:{
        type:String,
        required:[true,"name cannot be empty"],  
    },
    username:{
        type:String,
        required:[true,"username cannot be empty"],
        unique:[true,"This username is already taken"],
    },
    password:{
        type:String,
        required:[true,"password cannot be empty"],
        select:false,
        minLength:[8,"password cannot be less than 8 characters"]
    },
    bio:{
        type:String
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

schema.pre("save",async function(next){
    if(!this.isModified("password"))
    {
        next();
    }
    this.password=await bcrypt.hash(this.password,10);
})

schema.methods.comparePassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

export const User=mongoose.models.User || model("User",schema);
