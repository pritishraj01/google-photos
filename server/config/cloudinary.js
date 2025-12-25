import { v2 as cloudinary } from "cloudinary"
import dotenv from "dotenv"
dotenv.config()
import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_APIKEY,
    api_secret: process.env.CLOUDINARY_APISECRET
})

const uploadOnCloudinary = async (filePath) => {
    try {
        if (!filePath) return null
        let result =await cloudinary.uploader.upload(filePath, { resource_type: "auto" })
        console.log(result)
        fs.unlinkSync(filePath)
        return result.secure_url
    } catch (error) {
        fs.unlinkSync(filePath)
        console.log(error)
    }
}

export default uploadOnCloudinary