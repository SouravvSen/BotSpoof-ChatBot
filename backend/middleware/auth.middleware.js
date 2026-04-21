import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET || "default_secret");

            req.user = await User.findById(decoded.userId).select("-password");
            return next(); // Token is valid, proceed
        } catch (error) {
            console.error("Auth middleware error:", error);
            // If token is invalid, we still allow the request but without a user (Guest Mode)
            return next(); 
        }
    }

    // If no token is provided, just proceed to next middleware (Guest Mode)
    next();
};

export default protect;
