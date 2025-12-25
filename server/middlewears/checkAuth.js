import jwt from "jsonwebtoken"

const checkAuth= async(req,res,next)=>{
    try {
        let token= req.cookies.token
        if(!token){
            return res.status(401).json({message:"User is not authenticated"})
        }

        let verifyToken= jwt.verify(token,process.env.JWT_SECRET)
        req.userId= verifyToken.id

        next()
    } catch (error) {
        return res.status(500).json({message:"checkAuth Internal error"})
    }
}

export default checkAuth