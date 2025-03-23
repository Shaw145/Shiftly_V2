const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "inTransit", "completed", "cancelled"],
    default: "pending",
  },
  cancelledAt: {
    type: Date,
  },
  cancellationReason: {
    type: String,
  },
  pickup: {
    street: String,
    city: String,
    state: String,
    pincode: String,
    landmark: String,
  },
  delivery: {
    street: String,
    city: String,
    state: String,
    pincode: String,
    landmark: String,
  },
  goods: {
    type: {
      type: String,
      required: true,
      enum: [
        "household_small",
        "household_medium",
        "household_large",
        "light",
        "heavy",
      ],
    },
    items: [
      {
        name: String,
        weight: Number,
        quantity: Number,
      },
    ],
    additionalItems: String,
  },
  vehicle: String,
  schedule: {
    date: Date,
    time: String,
    urgency: String,
    insurance: String,
    specialInstructions: String,
  },
  distance: Number,
  estimatedPrice: {
    min: Number,
    max: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
