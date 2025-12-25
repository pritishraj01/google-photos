import express, { Router } from "express"
import { getme, login, logout, signup } from "../controllers/auth.controllers.js"
import checkAuth from "../middlewears/checkAuth.js"

const authRouter = Router()

authRouter.post("/signup", signup)
authRouter.post("/login", login)
authRouter.get("/logout", logout)
authRouter.get("/getme", checkAuth, getme)

export default authRouter