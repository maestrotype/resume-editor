const { v4: uuid } = require("uuid");

class Resume {
  constructor({ name, title, summary, skills, experience, education, contacts }) {
    this.id = uuid();
    this.name = name || "";
    this.title = title || "";
    this.summary = summary || "";
    this.skills = skills || "";
    this.experience = experience || "";
    this.education = education || "";
    this.contacts = contacts || "";
    this.createdAt = new Date().toISOString();
  }
}

module.exports = Resume;
