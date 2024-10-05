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
import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from "./constants/events.js";
import {v4 as uuid} from "uuid";
import { getSockets } from "./lib/helper.js";
import { Message } from "./models/messageModel.js";
import cors from "cors"

const app=express();
const server=createServer(app) //for socket setup
const io=new Server(server,{}); //for socket setup
dotenv.config();
const uri=process.env.CONNECTION_URI
export const adminSecretKey=process.env.ADMIN_SECRET_KEY || "shdcdljcsdknc";
export const envMode=process.env.NODE_ENV.trim() || "PRODUCTION";
export const userSocketIDs=new Map();


//dbconnection
connectDB(uri);

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:["http://localhost:5173","http://localhost:4173",process.env.CLIENT_URL],
    credentials:true
}));


//routes
app.use("/api/v1/user",userRouter)
app.use("/api/v1/chat",chatRouter)
app.use("/api/v1/admin",adminRouter)

//socket connection middleware
io.use((socket,next)=>{
    
})

//socket connection
io.on("connection",(socket)=>{
    
    const user={
        _id:"ajkjak",
        name:"hhhhd"
    }

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

    socket.on("disconnect",()=>{
        console.log("User disconnected");
        userSocketIDs.delete(user._id.toString())
    })
})

app.use(errorMiddleware);

//listener
const port=process.env.PORT || 3999
server.listen(port,()=>{      //when connecting to socket make sure to connect to the http Server
    console.log(`listening on port ${port} in ${envMode} mode`)
})