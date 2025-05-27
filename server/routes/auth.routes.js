const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const router = express.Router();
const SECRET_KEY = "supersecretkey";

// Register new user
router.post("/register", async (req, res) => {
  const { username, password, avatar } = req.body;
  console.log("[Auth] Registration started:", {
    username,
    avatarProvided: !!avatar,
    avatarPath: avatar || 'none'
  });
  
  try {
    if (!username || !password) {
      console.error("[Auth] Registration failed: Missing required fields");
      return res.status(400).json({ 
        success: false,
        message: "Missing required fields" 
      });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.error("[Auth] Registration failed: User exists:", username);
      return res.status(400).json({ 
        success: false,
        message: "User already exists" 
      });
    }

    const newUser = new User({ username, password, avatar });
    await newUser.save();
    
    console.log("[Auth] User saved to database:", {
      username,
      id: newUser._id,
      avatarSaved: !!newUser.avatar,
      avatarPath: newUser.avatar || 'none'
    });

    // Generate token for immediate login after registration
    const token = jwt.sign(
      { id: newUser._id, username, avatar: newUser.avatar },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(201).json({ 
      success: true,
      message: "User registered successfully",
      token,
      avatar: newUser.avatar
    });
  } catch (error) {
    console.error("[Auth] Registration error:", error);
    res.status(500).json({ 
      success: false,
      message: "Registration failed" 
    });
  }
});

// User login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log("[Auth] Login attempt:", { username });
  
  try {
    const user = await User.findOne({ username });
    if (!user) {
      console.error("[Auth] Login failed: User not found:", username);
      return res.status(401).json({ 
        success: false,
        message: "Invalid credentials" 
      });
    }

    // TODO: Implement password comparison
    // const isMatch = await user.comparePassword(password);
    // if (!isMatch) {
    //   console.error("[Auth] Login failed: Invalid password for user:", username);
    //   return res.status(401).json({ 
    //     success: false,
    //     message: "Invalid credentials" 
    //   });
    // }

    const token = jwt.sign(
      { id: user._id, username, avatar: user.avatar },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    console.log("[Auth] Login successful:", {
      username,
      id: user._id,
      hasAvatar: !!user.avatar,
      avatarPath: user.avatar || 'none'
    });

    res.json({ 
      success: true,
      token, 
      avatar: user.avatar 
    });
  } catch (error) {
    console.error("[Auth] Login error:", error);
    res.status(500).json({ 
      success: false,
      message: "Login failed" 
    });
  }
});

module.exports = router;
