import express from "express"
import userRouter from "./routes/userRoutes.js"
import chatRouter from "./routes/chatRoutes.js"
import adminRouter from "./routes/adminRoutes.js"
import { connectDB } from "./utils/features.js";
import dotenv from "dotenv"
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import {createServer} from "http";
import { CHAT_JOINED, CHAT_LEAVED, NEW_MESSAGE, NEW_MESSAGE_ALERT, ONLINE_USERS, START_TYPING, STOP_TYPING } from "./constants/events.js";
import {v4 as uuid} from "uuid";
import { getSockets } from "./lib/helper.js";
import { Message } from "./models/messageModel.js";
import cors from "cors"
import {v2 as cloudinary} from "cloudinary";
import { corsConfig } from "./constants/config.js";
import { socketAuthenticator } from "./middlewares/auth.js";

const app=express();
const server=createServer(app) //for socket setup
const io=new Server(server,{cors:corsConfig}); //for socket setup
dotenv.config({
    path:"./.env"
});
const uri=process.env.CONNECTION_URI
export const adminSecretKey=process.env.ADMIN_SECRET_KEY || "shdcdljcsdknc";
export const envMode=process.env.NODE_ENV.trim() || "PRODUCTION";
export const userSocketIDs=new Map();
const onlineUsers=new Set();

//dbconnection
connectDB(uri);

//cloudinary setup
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

app.set("io",io) //to access io in other files

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsConfig));


//routes
app.use("/api/v1/user",userRouter)
app.use("/api/v1/chat",chatRouter)
app.use("/api/v1/admin",adminRouter)

//socket connection middleware
io.use((socket,next)=>{
    cookieParser()(socket.request,socket.request.res, async(err)=>{
        await socketAuthenticator(err,socket,next);
    })
})

//socket connection
io.on("connection",(socket)=>{
    
    const user=socket.user;

    userSocketIDs.set(user._id.toString(),socket.id);
    
    console.log("a user connected",socket.id);
    
    socket.on(NEW_MESSAGE,async({chatId,members,message})=>{
        
        const messageForRealTime={
            content:message,
            _id:uuid(),
            sender:{
                _id:user._id,
                name:user.name
            },
            chat:chatId,
            createdAt:new Date().toISOString()
        }
        
        const messageForDB={  //message to store the in DB
            content:message,
            sender:user._id,
            chat:chatId
        }
        
        const membersSocket=getSockets(members); //to send message to whom

        io.to(membersSocket).emit(NEW_MESSAGE, {
            chatId,
            message:messageForRealTime
        })

        io.to(membersSocket).emit(NEW_MESSAGE_ALERT,{chatId})

        try{
            await Message.create(messageForDB);
        }
        catch(error)
        {
            console.log(error)
        }
        
    })

    socket.on(START_TYPING,({members,chatId})=>{
        const membersSocket=getSockets(members); //to send message to whom
        console.log("start-typing",{members,chatId}) 
        socket.to(membersSocket).emit(START_TYPING,{chatId})
    })

    socket.on(STOP_TYPING,({members,chatId})=>{
        const membersSocket=getSockets(members); //to send message to whom
        console.log("stop-typing",{members,chatId}) 
        socket.to(membersSocket).emit(STOP_TYPING,{chatId})
    })

    socket.on(CHAT_JOINED,({userId,members})=>{
        console.log("chat-joined",userId)
        onlineUsers.add(userId.toString());

        const membersSocket=getSockets(members); //to send message to whom
        io.to(membersSocket).emit(ONLINE_USERS,Array.from(onlineUsers)); //to send online users to all the members of the chat
    })

    socket.on(CHAT_LEAVED,({userId,members})=>{
        console.log("chat-leaved",userId)
        onlineUsers.delete(userId.toString());

        const membersSocket=getSockets(members); //to send message to whom
        io.to(membersSocket).emit(ONLINE_USERS,Array.from(onlineUsers));  //getting some error here

    })

    socket.on("disconnect",()=>{
        console.log("User disconnected");
        userSocketIDs.delete(user._id.toString())
    })
})

app.use(errorMiddleware);

//listener
try{
    const port=process.env.PORT || 3999
    server.listen(port,()=>{      //when connecting to socket make sure to connect to the http Server
        console.log(`listening on port ${port} in ${envMode} mode`)
    })
}catch(error)
{
    console.log(error)
}