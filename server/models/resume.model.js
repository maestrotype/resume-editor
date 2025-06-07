const mongoose = require("mongoose");

const ResumeSchema = new mongoose.Schema({
  name: String,
  title: String,
  position: String,
  summary: String,
  skills: String,
  experience: String,
  education: String,
  contacts: String,
  avatar: String, 
  filePath: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Resume", ResumeSchema);
