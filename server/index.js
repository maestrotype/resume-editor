const express = require("express");
const cors = require("cors");
const uploadRoutes = require("./routes/upload.routes");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./mongo");
const resumeRoutes = require("./routes/resume.routes");
const authRoutes = require("./routes/auth.routes");

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use("/api", uploadRoutes);
app.use("/api", resumeRoutes);
app.use("/api", authRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
