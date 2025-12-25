import uploadOnCloudinary from "../config/cloudinary.js"
import Picture from "../model/pic.model.js"

export const createPic = async (req, res) => {
    try {
        let { title } = req.body
        let imagePath = req.file.path
        let userId = req.userId

        if (!title || !imagePath) {
            return res.status(400).json({ message: "Title or Image missing" })
        }

        let imageUrl = await uploadOnCloudinary(imagePath)

        let result = await Picture.create({
            title,
            photo: imageUrl,
            owner: userId
        })

        return res.status(201).json(result)

    } catch (error) {
        console.log(`createpic error: ${error}`)
        return res.status(500).json({ message: "createpic internal error" })
    }
}

export const getPic = async (req, res) => {
    try {
        let userId = req.userId

        if (!userId) {
            return res.status(401).json({ message: "User is not authenticated" })
        }

        let result = await Picture.find({ owner: userId })
        return res.status(200).json(result)

    } catch (error) {
        console.log(`getPic error: ${error}`)
        return res.status(500).json({ message: "getpic internal error" })
    }
}

export const deletePic = async (req, res) => {
    try {
        let { id } = req.params
        await Picture.findByIdAndDelete(id)
        return res.status(200).json({ message: "Pic deleted" })
    } catch (error) {
        console.log(`deletepic error ${error}`)
    }
}