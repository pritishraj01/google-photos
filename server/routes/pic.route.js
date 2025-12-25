import express, { Router } from "express"
import { createPic, deletePic, getPic } from "../controllers/user.controllers.js"
import checkAuth from "../middlewears/checkAuth.js"
import upload from "../middlewears/multer.js"

const picRouter = Router()

picRouter.post("/createPic", checkAuth, upload.single('photo'), createPic)
picRouter.get("/getpic", checkAuth, getPic)
picRouter.delete("/deletepic/:id", checkAuth, deletePic)


export default picRouter