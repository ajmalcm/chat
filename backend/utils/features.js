import mongoose from "mongoose";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import { v4 as uuid } from "uuid";
import { getBase64, getSockets } from "../lib/helper.js";
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

export const uploadFilesToCloudinary = async (files = []) => {
  const uploadPromises = files.map((file) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        getBase64(file),
        {
          resource_type: "auto",
          public_id: uuid(),
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
    });
  });
  console.log(uploadPromises);
  try {
    const results = await Promise.all(uploadPromises);
    console.log(results);
    const formattedResults = results.map((result) => ({
      public_id: result.public_id,
      url: result.secure_url,
    }));
    return formattedResults;
  } catch (err) {
    console.log(err)
    throw new Error("Error uploading files to cloudinary", err);
  }
};

 

export const deleteFilesFromCloudinary=async(public_ids)=>{
  
}


export const emitEvent=(req,event,users,data)=>{
  const io=req.app.get("io");
  const userSocket=getSockets(users);

  io.to(userSocket).emit(event, data);
  console.log("emitting event.",event)
}