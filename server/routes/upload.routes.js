const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// Configure upload path
const uploadPath = path.join(__dirname, "../../uploads/avatars");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = `avatar-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      console.error("Invalid file type:", file.mimetype);
      return cb(new Error('Only image files are allowed'), false);
    }
    cb(null, true);
  }
});

router.post("/avatar", upload.single("avatar"), (req, res) => {
  try {
    if (!req.file) {
      console.error("[Avatar Upload] No file in request");
      return res.status(400).json({
        success: false,
        message: "No file uploaded" 
      });
    }

    // Generate path for database storage and client response
    const avatarPath = `/api/uploads/avatars/${req.file.filename}`;
    
    // Log full file information for debugging avatar issues
    console.log("[Avatar Upload] Success:", {
      filename: req.file.filename,
      originalName: req.file.originalname,
      savedTo: req.file.path,
      publicPath: avatarPath,
      size: req.file.size,
      mimetype: req.file.mimetype
    });

    res.json({
      success: true,
      message: "File uploaded successfully",
      avatarPath
    });
  } catch (error) {
    console.error("[Avatar Upload] Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to process uploaded file" 
    });
  }
});

module.exports = router;
