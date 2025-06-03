require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const config = require('./src/config/app.config');
const corsConfig = require('./src/config/cors.config');
const { errorLogger, errorHandler, notFound } = require('./src/middleware/error.middleware');
const authRoutes = require("./routes/auth.routes");
const uploadRoutes = require("./routes/upload.routes");
const resumeRoutes = require("./routes/resume.routes");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || config.server.port;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('[MongoDB] MONGODB_URI is not defined');
  process.exit(1);
}

console.log('[Init] Starting server initialization...');

// Middleware
app.use(cors(corsConfig));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Initialize upload directories
const initializeUploadDirectories = () => {
  const directories = [
    path.join(__dirname, "uploads"),
    path.join(__dirname, "uploads/avatars"),
    path.join(__dirname, "uploads/resumes"),
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
console.log('[Init] Upload directories initialized');

// Serve static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
console.log('[Init] Static file serving configured');

// Routes
console.log('[Init] Configuring routes...');
app.use(`${config.api.prefix}/auth`, authRoutes);
app.use(`${config.api.prefix}/upload`, uploadRoutes);
app.use(`${config.api.prefix}/resumes`, resumeRoutes);
console.log('[Init] Routes configured');

// Error handling
app.use(errorLogger);
app.use(errorHandler);
app.use(notFound);
console.log('[Init] Error handling middleware configured');

// Test route
app.get('/test', (req, res) => {
  res.json({ message: 'Server is working' });
});

// MongoDB connection
console.log('[MongoDB] Attempting to connect to database...');
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log("[MongoDB] Connected to database:", mongoose.connection.name);
    
    // Start server only after successful database connection
    app.listen(PORT, () => {
      console.log(`[Server] Running on http://localhost:${PORT}`);
      console.log(`[Server] API prefix: ${config.api.prefix}`);
      console.log('[Server] Initialization complete');
    });
  })
  .catch(err => {
    console.error("[MongoDB] Connection error:", err);
    process.exit(1);
  });
