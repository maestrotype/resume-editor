const express = require("express");
const multer = require("multer");
const path = require("path");
const Resume = require("./resume.model");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

router.post("/upload-avatar", upload.single("avatar"), async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "File not upload" });
  const avatarPath = `/uploads/${req.file.filename}`;
  res.json({ avatar: avatarPath });
});

router.post("/resumes", upload.single("avatar"), async (req, res) => {
  try {
    const avatarPath = req.file ? `/uploads/${req.file.filename}` : null;
    const newResume = new Resume({ ...req.body, avatar: avatarPath });
    await newResume.save();
    res.status(201).json(newResume);
  } catch (error) {
    res.status(500).json({ message: "Error creating resume" });
  }
});

// DELETE
router.delete("/resumes/:id", async (req, res) => {
  try {
    await Resume.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: "Error deleting resume" });
  }
});

// PUT
router.put("/resumes/:id", upload.single("avatar"), async (req, res) => {
  try {
    const avatarPath = req.file ? `/uploads/${req.file.filename}` : null;

    const updatedResume = await Resume.findByIdAndUpdate(
      req.params.id,
      { ...req.body, ...(avatarPath && { avatar: avatarPath }) },
      { new: true }
    );

    if (!updatedResume) return res.status(404).json({ message: "Resume not found" });
    res.json(updatedResume);
  } catch (error) {
    res.status(500).json({ message: "Error updating resume" });
  }
});

router.get("/resumes", async (req, res) => {
  try {
    const resumes = await Resume.find();
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching resumes" });
  }
});

router.get("/resumes/:id", async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) return res.status(404).json({ message: "Resume not found" });
    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: "Error fetching resume" });
  }
});

module.exports = router;
