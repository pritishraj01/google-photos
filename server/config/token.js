import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const generateToken=(id)=>{
    try {
        const token= jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"365d"})
        return token
    } catch (error) {
        console.log(`generatetoken error: ${error}`)
    }
}

export default generateToken