import express from "express"
import userRouter from "./routes/userRoutes.js"
const app=express();


app.use("/user",userRouter)

app.listen(3000,()=>{
    console.log(`listening on port 3000`)
})