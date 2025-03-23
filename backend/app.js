const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./database/connection");

dotenv.config(); // Load environment variables

const app = express();

// Enable CORS
app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend URL
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add request logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Test route
app.get("/test", (req, res) => {
  res.json({ message: "Backend is working!" });
});

// Routes
const authRoutes = require("./routes/authRoutes");
const emailRoutes = require("./routes/emailRoutes");
const passwordRoutes = require("./routes/passwordRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
app.use("/api/auth", authRoutes); // Mount authRoutes under /api/auth
app.use("/api/auth", emailRoutes); // Mount emailRoutes under /api/auth
app.use("/api/auth", passwordRoutes); // Mount password routes under /api/auth
app.use("/api/bookings", bookingRoutes); // Mount booking routes under /api/bookings

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({ error: err.message });
});

// Connect to MongoDB first, then start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
