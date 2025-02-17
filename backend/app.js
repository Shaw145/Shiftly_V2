const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./database/connection");

dotenv.config(); // Load environment variables

const app = express();

// Enable CORS
app.use(cors({
  origin: "*", // Replace with your frontend URL
  credentials: true,
}));

// Middleware
app.use(bodyParser.json());

// Root route
app.get("/", (req, res) => {
  res.send("Shiftly Backend is running!");
});

// Routes
const authRoutes = require("./routes/authRoutes");
const emailRoutes = require("./routes/emailRoutes");
const passwordRoutes = require("./routes/passwordRoutes");
app.use("/api/auth", authRoutes); // Mount authRoutes under /api/auth
app.use("/api/auth", emailRoutes); // Mount emailRoutes under /api/auth
app.use("/api/auth", passwordRoutes); // Mount password routes under /api/auth

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Connect to MongoDB
connectDB();