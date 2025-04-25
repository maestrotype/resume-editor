const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const resumeRoutes = require("./resume.routes");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

app.use("/api", resumeRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
