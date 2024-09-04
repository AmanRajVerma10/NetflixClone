import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export async function signup(req, res) {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ status: false, message: "Require all fields" });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ status: false, message: "Invalid email" });
    }
    if (password.length < 6) {
      return res.status(400).json({
        status: false,
        message: "Password must contain at least 6 characters",
      });
    }

    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res
        .status(400)
        .json({ status: false, message: "Email already exists" });
    }
    const existingUserByUsername = await User.findOne({ username });
    if (existingUserByUsername) {
      return res
        .status(400)
        .json({ status: false, message: "Username already exists" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

    const newUser = new User({
      email,
      password: hashedPassword,
      username,
      image,
    });

    generateTokenAndSetCookie(newUser._id,res);
    await newUser.save();
    return res.status(200).json({
      status: true,
      user: {
        ...newUser._doc,
        password: "",
      },
    });
  } catch (error) {
    console.log("Error in signup controller:", error.message);
    return res
      .status(500)
      .json({ status: 500, message: "Internal Server Error" });
  }
}

export function login(req, res) {
  res.send("Login");
}

export function logout(req, res) {
  res.send("Logout");
}
