const express = require("express");
const Resume = require("./resume.model");

const router = express.Router();

// GET all
router.get("/resumes", async (req, res) => {
  const resumes = await Resume.find();
  res.json(resumes);
});

// POST
router.post("/resumes", async (req, res) => {
  const newResume = new Resume(req.body);
  await newResume.save();
  res.status(201).json(newResume);
});

// DELETE
router.delete("/resumes/:id", async (req, res) => {
  await Resume.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

// PUT
router.put("/resumes/:id", async (req, res) => {
  const updated = await Resume.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

module.exports = router;
