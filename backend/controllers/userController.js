import {User} from "../models/userModel.js"
import { sendToken } from "../utils/features.js";

export const registerUser=async(req,res,next)=>{
    const {name,username,password,bio}=req.body;

    const avatar={
        public_id:"rando",
        url:"randourl"
    }

    const user=await User.create({name,username,password,bio,avatar});

    sendToken(res,user,201,"User created successfully");
}

export const login=async(req,res,next)=>{
    res.json({login:"login response"})
}