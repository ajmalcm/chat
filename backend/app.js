import express from "express"
import userRouter from "./routes/userRoutes.js"
const app=express();

//dbconnection


//middlewares
app.use(express.json());


//routes
app.use("/user",userRouter)

//listener
app.listen(3000,()=>{
    console.log(`listening on port 3000`)
})