const express = require("express");
const fs = require("fs");
const path = require("path");
const Resume = require("./resume.model");

const router = express.Router();
const dbFile = path.join(__dirname, "db.json");

function readDB() {
  if (!fs.existsSync(dbFile)) return [];
  return JSON.parse(fs.readFileSync(dbFile, "utf8"));
}

function writeDB(data) {
  fs.writeFileSync(dbFile, JSON.stringify(data, null, 2));
}

// GET all
router.get("/resumes", (req, res) => {
  const resumes = readDB();
  res.json(resumes);
});

// POST
router.post("/resumes", (req, res) => {
  const newResume = new Resume(req.body);
  const resumes = readDB();
  resumes.push(newResume);
  writeDB(resumes);
  res.status(201).json(newResume);
});

// DELETE
router.delete("/resumes/:id", (req, res) => {
  const resumes = readDB().filter((r) => r.id !== req.params.id);
  writeDB(resumes);
  res.sendStatus(204);
});

// PUT
router.put("/resumes/:id", (req, res) => {
  let resumes = readDB();
  const index = resumes.findIndex((r) => r.id === req.params.id);
  if (index === -1) return res.sendStatus(404);
  resumes[index] = { ...resumes[index], ...req.body };
  writeDB(resumes);
  res.json(resumes[index]);
});

module.exports = router;
