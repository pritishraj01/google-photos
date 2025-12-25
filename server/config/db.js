import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

const mongourl=process.env.MONGOURL

const connectDB= async()=>{
    try {
        await mongoose.connect(mongourl)
        console.log("DB connected")
    } catch (error) {
        console.log(`Mongo error: ${error}`)
    }
}

export default connectDB