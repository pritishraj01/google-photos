import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import authRouter from "./routes/auth.routes.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import picRouter from "./routes/pic.route.js"
dotenv.config()

const port=process.env.PORT
const app=express()

app.use(cors({
    origin:"https://google-photos-client.onrender.com",
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())
app.use("/auth",authRouter)
app.use("/api",picRouter)

app.listen(port,()=>{
    connectDB()
    console.log(`server is started at ${port}`)
})