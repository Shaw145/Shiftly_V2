const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  createBooking,
  getBookings,
  getBookingById,
  cancelBooking,
} = require("../controllers/bookingController");

// Define routes
router.post("/create", protect, createBooking);
router.get("/my-bookings", protect, getBookings);
router.get("/:bookingId", protect, getBookingById);
router.put("/:bookingId/cancel", protect, cancelBooking);

module.exports = router;
