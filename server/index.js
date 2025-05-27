const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const authRoutes = require("./routes/auth.routes");
const uploadRoutes = require("./routes/upload.routes");
const resumeRoutes = require("./routes/resume.routes");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://andrey:1983adan@cluster0.t33yq8b.mongodb.net/resume-db";

// Middleware
app.use(cors());
app.use(express.json());

// Initialize upload directories
const initializeUploadDirectories = () => {
  const directories = [
    path.join(__dirname, "../uploads"),
    path.join(__dirname, "../uploads/avatars"),
    // Add any other required upload directories here
  ];

  directories.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log("[Init] Created directory:", dir);
    }
  });
};

// Initialize directories on server start
initializeUploadDirectories();

// Serve static files
app.use("/api/uploads", express.static(path.join(__dirname, "../uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/resumes", resumeRoutes);

// MongoDB connection with options
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("[MongoDB] Connected to database:", mongoose.connection.name);
})
.catch(err => {
  console.error("[MongoDB] Connection error:", err);
  process.exit(1);
});

app.listen(PORT, () => {
  console.log(`[Server] Running on http://localhost:${PORT}`);
});
