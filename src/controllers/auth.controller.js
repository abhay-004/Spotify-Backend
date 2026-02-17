import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

//register route for user

export const registerUser = async (req, res) => {
  try {
    const { userName, email, password, role = "user" } = req.body;

    if (!userName || !email || !password) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const isUserExists = await User.findOne({
      $or: [{ email }, { userName }],
    });

    if (isUserExists) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      userName,
      email,
      password: hashedPassword,
      role,
    });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
    );

    res.cookie("token", token);

    return res.status(201).json({
      message: "User registered successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);

    return res.status(501).json({
      message: error.message,
    });
  }
};

//login routes for user

export const loginUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    const user = await User.findOne({
      $or: [{ userName }, { email }],
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid crendentials" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
    );

    res.cookie("token", token);

    return res.status(200).json({
      message: "User logged in successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);

    return res.status(501).json({
      message: error.message,
    });
  }
};
