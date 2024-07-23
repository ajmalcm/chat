import express from "express"
import userRouter from "./routes/userRoutes.js"
import chatRouter from "./routes/chatRoutes.js"
import { connectDB } from "./utils/features.js";
import dotenv from "dotenv"
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
const app=express();
dotenv.config();
const uri=process.env.CONNECTION_URI

//dbconnection
connectDB(uri);

//middlewares
app.use(express.json());
app.use(cookieParser())


//routes
app.use("/user",userRouter)
app.use("/chat",chatRouter)

app.use(errorMiddleware);

//listener
const port=process.env.PORT || 3999
app.listen(port,()=>{
    console.log(`listening on port 3000`)
})