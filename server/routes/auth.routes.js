const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const fileService = require("../src/services/file.service");

const router = express.Router();
const SECRET_KEY = "your-super-secret-jwt-key";

// Register
router.post("/register", async (req, res) => {
    try {
        console.log('[Auth] Starting registration with:', {
            username: req.body.username,
            password: '***',
            avatar: req.body.avatar
        });

        // Check if user exists
        const existingUser = await User.findOne({ username: req.body.username });
        if (existingUser) {
            console.log('[Auth] Registration failed: User exists:', req.body.username);
            return res.status(400).json({ 
                success: false,
                message: "User already exists" 
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Create user with hashed password
        const newUser = new User({
            username: req.body.username,
            password: hashedPassword,
            avatar: req.body.avatar
        });

        // Save user
        await newUser.save();
        console.log('[Auth] User saved to database:', {
            username: newUser.username,
            avatarPath: newUser.avatar
        });

        // Generate token
        const token = jwt.sign(
            { id: newUser._id, username: newUser.username, avatar: newUser.avatar },
            SECRET_KEY,
            { expiresIn: "24h" }
        );

        res.status(201).json({
            success: true,
            token,
            username: newUser.username,
            avatar: newUser.avatar
        });
    } catch (error) {
        console.error('[Auth] Registration error:', error);
        res.status(500).json({ 
            success: false,
            message: "Registration failed",
            error: error.message 
        });
    }
});

// Login
router.post("/login", async (req, res) => {
    try {
        console.log('[Auth] Login attempt:', { username: req.body.username });

        // Check if username and password are provided
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({
                success: false,
                message: "Username and password are required"
            });
        }

        // Find user
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            console.log('[Auth] Login failed: User not found:', req.body.username);
            return res.status(401).json({
                success: false,
                message: "Invalid username or password"
            });
        }

        // Compare passwords using bcrypt
        const isValidPassword = await bcrypt.compare(req.body.password, user.password);
        if (!isValidPassword) {
            console.log('[Auth] Login failed: Invalid password for user:', req.body.username);
            return res.status(401).json({
                success: false,
                message: "Invalid username or password"
            });
        }

        // Generate token
        const token = jwt.sign(
            { id: user._id, username: user.username, avatar: user.avatar },
            SECRET_KEY,
            { expiresIn: "24h" }
        );

        console.log('[Auth] Login successful:', {
            username: user.username,
            avatarPath: user.avatar
        });

        res.json({
            success: true,
            token,
            username: user.username,
            avatar: user.avatar
        });
    } catch (error) {
        console.error('[Auth] Login error:', error);
        res.status(500).json({
            success: false,
            message: "An internal server error occurred",
            error: error.message
        });
    }
});

module.exports = router;
