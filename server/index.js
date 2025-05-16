const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const connectDB = require("./mongo");
const resumeRoutes = require("./routes/resume.routes");
const authRoutes = require("./routes/auth.routes");

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));

app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));
app.use("/uploads", express.static("uploads"));
app.use("/api", resumeRoutes);
app.use("/api", authRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
