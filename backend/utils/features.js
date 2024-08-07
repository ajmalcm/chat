import mongoose from "mongoose";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const jwtSecret = process.env.JWT_SECRET;
export const cookieOptions = {
  maxAge: 5 * 24 * 60 * 60 * 1000,
  httpOnly: true,
  secure: true,
  sameSite: "none",
};

export const connectDB = (uri) => {
  mongoose
    .connect(uri)
    .then((data) => {
      console.log(`connected to mongoDB ${data.connection.host}`);
    })
    .catch((err) => {
      throw err;
    });
};

export const sendToken = (res, user, status, message) => {
  const accessToken = jwt.sign({ _id: user._id }, jwtSecret);

  return res.status(status).cookie("realtime_accessToken", accessToken, cookieOptions).json({success:true,accessToken,message})
};

export const deleteFilesFromCloudinary=async(public_ids)=>{
  
}


export const emitEvent=(req,event,users,data)=>{
  console.log("emitting event.",event)
}