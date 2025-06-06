const express = require("express");
const { resumeUpload } = require("../src/config/upload.config");
const fileService = require("../src/services/file.service");
const ResumeService = require("../src/services/resume.service");

const router = express.Router();
const resumeService = new ResumeService(fileService);

router.post("/", resumeUpload.single("file"), async (req, res) => {
    try {
        const resume = await resumeService.createResume(req.body, req.file);
        res.status(201).json(resume);
    } catch (error) {
        console.error("Resume creation error:", error);
        res.status(500).json({ 
            message: "Error creating resume",
            error: error.message 
        });
    }
});

router.post('/', async (req, res) => {
    try {
      const newResume = await Resume.create({});
      res.status(201).json(newResume);
    } catch (error) {
      console.error('[Resume Create Error]', error);
      res.status(500).json({ message: 'Failed to create resume' });
    }
  });  

router.delete("/:id", async (req, res) => {
    try {
        await resumeService.deleteResume(req.params.id);
        res.sendStatus(204);
    } catch (error) {
        console.error("Resume deletion error:", error);
        res.status(500).json({ 
            message: "Error deleting resume",
            error: error.message 
        });
    }
});

router.put("/:id", resumeUpload.single("file"), async (req, res) => {
    try {
        const resume = await resumeService.updateResume(req.params.id, req.body, req.file);
        res.json(resume);
    } catch (error) {
        console.error("Resume update error:", error);
        res.status(500).json({ 
            message: "Error updating resume",
            error: error.message 
        });
    }
});

router.get("/", async (req, res) => {
    try {
        const resumes = await resumeService.getAllResumes();
        res.json(resumes);
    } catch (error) {
        console.error("Resume fetch error:", error);
        res.status(500).json({ 
            message: "Error fetching resumes",
            error: error.message 
        });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const resume = await resumeService.getResume(req.params.id);
        res.json(resume);
    } catch (error) {
        console.error("Resume fetch error:", error);
        res.status(500).json({ 
            message: "Error fetching resume",
            error: error.message 
        });
    }
});

module.exports = router;
