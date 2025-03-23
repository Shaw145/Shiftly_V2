const Booking = require("../models/Booking");

// Create new booking
const createBooking = async (req, res) => {
  try {
    const {
      pickup,
      delivery,
      goods,
      vehicle,
      schedule,
      distance,
      estimatedPrice,
    } = req.body;

    // Validate goods data
    if (!goods?.type || !Array.isArray(goods?.items)) {
      return res.status(400).json({
        success: false,
        error: "Invalid goods data",
        receivedData: { goods },
      });
    }

    // Validate required fields
    if (
      !pickup ||
      !delivery ||
      !vehicle ||
      !schedule ||
      !distance ||
      !estimatedPrice
    ) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields",
        receivedData: req.body,
      });
    }

    // Create the booking document
    const bookingData = {
      bookingId:
        "B" +
        Date.now().toString().slice(-6) +
        Math.floor(Math.random() * 1000)
          .toString()
          .padStart(3, "0"),
      userId: req.user._id,
      status: "pending",
      pickup,
      delivery,
      goods: {
        type: goods.type,
        items: goods.items, // Already in array format
        additionalItems: goods.additionalItems,
      },
      vehicle,
      schedule: {
        date: new Date(schedule.date),
        time: schedule.time,
        urgency: schedule.urgency,
        insurance: schedule.insurance,
        specialInstructions: schedule.specialInstructions,
      },
      distance,
      estimatedPrice,
    };

    const booking = await Booking.create(bookingData);

    res.status(201).json({
      success: true,
      bookingId: booking.bookingId,
      booking,
    });
  } catch (error) {
    console.error("Error in createBooking:", error);
    res.status(400).json({
      success: false,
      error: error.message,
      stack: error.stack,
    });
  }
};

// Get user's bookings
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id }).sort({
      createdAt: -1,
    }); // Sort by newest first

    res.json({
      success: true,
      bookings,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Get booking by ID
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      bookingId: req.params.bookingId,
      userId: req.user._id,
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        error: "Booking not found",
      });
    }

    res.json({
      success: true,
      booking,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Add this to your existing controllers
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      bookingId: req.params.bookingId,
      userId: req.user._id,
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        error: "Booking not found",
      });
    }

    // Only allow cancellation of pending bookings
    if (booking.status !== "pending") {
      return res.status(400).json({
        success: false,
        error: "Only pending bookings can be cancelled",
      });
    }

    booking.status = "cancelled";
    booking.cancelledAt = new Date();
    booking.cancellationReason = req.body.reason || "Cancelled by user";

    await booking.save();

    res.json({
      success: true,
      message: "Booking cancelled successfully",
      booking,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  createBooking,
  getBookings,
  getBookingById,
  cancelBooking,
};
