const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const adminProtect = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token){
            res.status(401)
            throw new Error("not authorized")
        }

        // verifying the jwt
        const verified = jwt.verify(token,  process.env.JWT_SECRET)

        // getting the user 
        const user = await User.findById(verified.id).select("-password")
        if(!user){
            res.status(404)
            throw new Error ("User not found")
        }

        if(!user.isAdmin){
            res.status(401)
            throw new Error("Not an admin")
        }

        req.user = user
        next()
    } catch (error) {
        
    }
})