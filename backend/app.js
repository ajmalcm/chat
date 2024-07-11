import express from "express"
import userRouter from "./routes/userRoutes.js"
import { connectDB } from "./utils/features.js";
import dotenv from "dotenv"
const app=express();
dotenv.config();
const uri=process.env.CONNECTION_URI

//dbconnection
connectDB(uri);

//middlewares
app.use(express.json());


//routes
app.use("/user",userRouter)

//listener
app.listen(3000,()=>{
    console.log(`listening on port 3000`)
})