import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { envVars } from "../config/envVars.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies["jwt-netflix"];
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorised: No token found" });
    }
    const decodedToken = jwt.verify(token, envVars.JWT_SECRET_KEY);
    if (!decodedToken) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorised: Invalid token" });
    }
    const user = await User.findById(decodedToken.userId).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    req.user=user;
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
