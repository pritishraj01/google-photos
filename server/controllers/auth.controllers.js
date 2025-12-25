import generateToken from "../config/token.js"
import Auth from "../model/auth.model.js"
import bcrypt from "bcryptjs"

export const signup = async (req, res) => {
    try {
        let { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Fill all the details" })
        }

        let existUser = await Auth.findOne({ email })

        if (existUser) {
            return res.status(404).json({ message: "User already exist" })
        }

        const hashPass = await bcrypt.hash(password, 10)

        const user = await Auth.create({
            name,
            email,
            password: hashPass
        })

        const token = generateToken(user._id)
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 365 * 24 * 60 * 60 * 1000
        })

        return res.status(201).json({ message: "User created" })

    } catch (error) {
        console.log(`signup error: ${error}`)
        return res.status(500).json({ message: "Signup Internal error" })
    }
}

export const login = async (req, res) => {
    try {
        let { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: "Fill all the details" })
        }

        let existUser = await Auth.findOne({ email })

        if (!existUser) {
            return res.status(409).json({ message: "Email not registered" })
        }

        const matchPass = await bcrypt.compare(password, existUser.password)

        if (!matchPass) {
            return res.status(401).json({ message: "Password not matched" })
        }

        const token = generateToken(existUser._id)
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 365 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({ message: "Loggedin successfully" })

    } catch (error) {
        console.log(`login error: ${error}`)
        return res.status(500).json({ message: "login Internal error" })
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        })

        return res.status(200).json({ message: "Logged out successfully" })
    } catch (error) {
        console.log(`logout error: ${error}`)
        return res.status(500).json({ message: "logout Internal error" })
    }
}


export const getme = async (req, res) => {
    try {
        let userId = req.userId
        if (!userId) {
            return res.status(401).json({ message: "no user found by getme/ user not authenticated" })
        }

        let user = await Auth.findById(userId).select("-password")
        if (!user) {
            return res.status(401).json({ message: "no user found by getme" })
        }
        return res.status(200).json(user)

    } catch (error) {
        console.log(`getme error: ${error}`)
    }
}