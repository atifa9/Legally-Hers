const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { protect } = require("../middleware/authenticateToken");
const User = require("../models/user"); // ✅ adjust the path if needed

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET; 
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";

// Generate JWT token
const generateToken = (userId) => {
  if (!process.env.JWT_SECRET) {
    console.log("JWT_SECRET is not defined in the environment");
    throw new Error("JWT_SECRET is not defined");
  }

  
  return jwt.sign({ userId },  process.env.JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

// Register Route
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(400).json({ message: "Username already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = generateToken(newUser._id);

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        plan: newUser.plan,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user)
      return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user._id);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        plan: user.plan,
      },
    });
  } catch (err) {
    console.error("Login Error:", err); 
    res.status(500).json({ message: "Server error" });
  }
});

// Protected Route: Account Info (Use Protect middleware)
router.get("/account-info", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(400).json({ message: "User not found" });

    res.status(200).json({
      message: "Account info retrieved",
      user: {
        username: user.username,
        email: user.email,
        plan: user.plan,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        gender: user.gender || "",
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update Profile Route (for profile updates)
router.put("/update-profile", protect, async (req, res) => {
  const { firstName, lastName, username, email, gender } = req.body;

  try {
    console.log("JWT_SECRET in update-profile route:", JWT_SECRET);
    const updatedUser = await User.findByIdAndUpdate(
      req.user.userId,
      { firstName, lastName, username, email, gender },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        username: updatedUser.username,
        email: updatedUser.email,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        gender: updatedUser.gender,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update Password Route
router.put("/change-password", protect, async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(400).json({ message: "User not found" });

    // Check if the old password matches
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Old password is incorrect" });

    // Hash the new password and save it
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
      message: "Password updated successfully",
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;