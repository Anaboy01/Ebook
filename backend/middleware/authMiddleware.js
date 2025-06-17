const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

// Protect - for authenticated users
const protect = asyncHandler(async (req, res, next) => {
    let token;
  
    // Check for token in cookies
    if (req.cookies.token) {
      token = req.cookies.token;
    }
    // Or check for token in Authorization header
    else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }
  
    if (!token) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  
    const verified = jwt.verify(token, process.env.JWT_SECRET);
  
    const user = await User.findById(verified.id).select("-password");
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
  
    req.user = user;
    next();
  });
  

// Admin Protect - for admin only routes
const adminProtect = asyncHandler(async (req, res, next) => {
    let token;
    if (req.cookies.token) {
      token = req.cookies.token;
    }
    // Or check for token in Authorization header
    else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }
  
    if (!token) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  
    const verified = jwt.verify(token, process.env.JWT_SECRET);
  
    const user = await User.findById(verified.id).select("-password");
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

  if (!user.isAdmin) {
    res.status(403);
    throw new Error("Not an admin");
  }

  req.user = user;
  next();
});

module.exports = { protect, adminProtect };
