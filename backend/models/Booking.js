const mongoose = require("mongoose");

const BookingStatus = ["BOOKED", "CANCELLED"];

const bookingSchema = new mongoose.Schema({
  showId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MovieShow",
    required: true,
  },
  bookedSeats: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ShowSeat",
    },
  ],
  status: {
    type: String,
    enum: BookingStatus,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  isUsed: {
    type: Boolean,
    default: false,
  },
  qrImage: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bookingStatus: {
    type: String,
    enum: ["Booked", "Cancelled", "Completed"],
    default: "Booked",
  },
  showDate: {
    type: Date,
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
  cancelledAt: {
    type: Date,
  },
  cancellationReason: {
    type: String,
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
