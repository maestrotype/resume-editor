const express = require("express");
const multer = require("multer");
const fileService = require("../src/services/file.service");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, fileService.avatarsDir);
  },
  filename: (req, file, cb) => {
    const filename = fileService.generateAvatarFilename(file.originalname);
    cb(null, filename);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (!fileService.isImageFile(file.mimetype)) {
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

    // Получаем путь для сохранения в БД
    const avatarPath = fileService.getAvatarDbPath(req.file.filename);
    
    console.log("[Avatar Upload] Success:", {
      filename: req.file.filename,
      originalName: req.file.originalname,
      savedTo: req.file.path,
      dbPath: avatarPath,
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
