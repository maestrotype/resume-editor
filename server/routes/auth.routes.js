const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const router = express.Router();
const SECRET_KEY = "supersecretkey";

// Register user
router.post("/register", async (req, res) => {
  console.log(req.body);
  try {
    const { username, password, avatar } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ username, password, avatar });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully", avatar });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Registration failed" });
  }
});

// User authorization
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // const isMatch = await user.comparePassword(password);
    // if (!isMatch) {
    //   return res.status(401).json({ message: "Invalid credentials" });
    // }

    const token = jwt.sign({ id: user._id, username, avatar: user.avatar }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ token, avatar: user.avatar });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed" });
  }
});

module.exports = router;
