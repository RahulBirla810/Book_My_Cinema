const mongoose = require("mongoose");
const crypto = require("crypto");
const mailSender = require("../utils/mailSender");
const Transaction = require("../models/Transaction");
const Booking = require("../models/Booking");
const User = require("../models/User");
const { instance } = require("../config/razorpay");
const Show = require("../models/MovieShow");
const ShowSeat = require("../models/ShowSeat");
const { compareSync } = require("bcrypt");
const MovieShow = require("../models/MovieShow");
const Seat = require("../models/Seat");

// Capture Payment
exports.capturePayment = async (req, res) => {
  try {
    const { showId, movieId, cinemaId, screenId, seatsBook } = req.body;
    const userId = req.user.id;

    console.log("idhar aayaya");

    // Validate booking ID
    const show = await Show.findById(showId).populate("showSeats");

    if (!show) {
      return res.status(404).json({
        success: false,
        message: "Invalid show ID or show not found",
      });
    }

    // Validate and fetch seats safely without early return response leak inside map
    const findSeats = [];
    for (const seatId of seatsBook) {
      const findSeat = await ShowSeat.findById(seatId).populate("seatId");
      if (!findSeat) {
        return res.status(404).json({
          success: false,
          message: `Seat with ID ${seatId} not found`,
        });
      }
      if (findSeat.status !== "Reserved") {
        return res.status(400).json({
          success: false,
          message: "Seat is already booked recently!",
        });
      }
      findSeats.push(findSeat);
    }

    console.log("Found Seats:", findSeats);

    // Initialize amount to 0
    let amount = 0;

    // Sum up the price
    findSeats.forEach((seat) => {
      if (
        seat &&
        seat.seatId &&
        typeof seat.seatId.seatPrice === "number" &&
        !isNaN(seat.seatId.seatPrice)
      ) {
        console.log("Price of seat:", seat.seatId.seatPrice);
        amount += seat.seatId.seatPrice;
      } else {
        console.log("Invalid price for seat:", seat);
      }
    });

    const isDummy =
      !process.env.RAZORPAY_KEY ||
      process.env.RAZORPAY_KEY.includes("dummy") ||
      !process.env.RAZORPAY_SECRET ||
      process.env.RAZORPAY_SECRET.includes("dummy");

    if (isDummy) {
      // Mock Razorpay Order for local testing
      const paymentResponse = {
        id: "order_" + Math.random().toString(36).substring(2, 15),
        entity: "order",
        amount: amount * 100,
        amount_paid: 0,
        amount_due: amount * 100,
        currency: "INR",
        receipt: Math.random().toString(),
        status: "created",
        attempts: 0,
        notes: [],
        created_at: Math.floor(Date.now() / 1000)
      };

      console.log("\n==================================================");
      console.log("💳 Mock Razorpay Order Created Successfully!");
      console.log(`Order ID: ${paymentResponse.id}`);
      console.log(`Amount: ₹${amount}`);
      console.log("==================================================\n");

      return res.status(200).json({
        success: true,
        data: paymentResponse,
        showId,
        seatsBook,
        message: "Payment initiated successfully (MOCKED)",
      });
    }

    // Razorpay order creation options
    const options = {
      amount: amount * 100, // Convert to smallest currency unit (paise for INR)
      currency: "INR",
      receipt: Math.random(Date.now()).toString(), // Generate a random receipt ID
    };

    try {
      const paymentResponse = await instance.orders.create(options);

      return res.status(200).json({
        success: true,
        data: paymentResponse,
        showId,
        seatsBook,
        message: "Payment initiated successfully",
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Could not initiate payment",
        error: err.message || (err.error && err.error.description) || "Unknown error",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error capturing payment",
      error: err.message,
    });
  }
};

// Verify Payment Signature
exports.verifySignature = async (req, res, next) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    showId,
    seatsForBook,
    totalAmount,
  } = req.body;

  const io = req.io;

  const isDummy =
    !process.env.RAZORPAY_SECRET ||
    process.env.RAZORPAY_SECRET.includes("dummy");

  if (isDummy || (razorpay_order_id && razorpay_order_id.startsWith("order_"))) {
    console.log("\n==================================================");
    console.log("🛡️ Mock Signature Verification Bypassed successfully!");
    console.log(`Order ID: ${razorpay_order_id}`);
    console.log(`Payment ID: ${razorpay_payment_id}`);
    console.log("==================================================\n");
  } else {
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(500).json({
        success: false,
        message: "Payment verification failed",
      });
    }
  }

  try {
    // Update booking and create transaction
    const movieShow = await MovieShow.findById(showId);
    if (!movieShow) {
      console.log("Movie show not found");
      return res.status(401).json({
        success: false,
        message: "movie not found",
      });
    }

    // Mark the seats as Booked
    const result = await ShowSeat.updateMany(
      { _id: { $in: seatsForBook }, status: "Reserved" },
      { $set: { status: "Booked", reservedAt: null } }
    );
    console.log("book res: ", result);

    if (result.modifiedCount === 0) {
      return res.status(400).json({
        success: false,
        message: "Seats are not reserved or already booked.",
      });
    }

    // Emit event to notify clients about the updated seats
    io.emit("seatsUpdated", seatsForBook);

    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error verifying payment",
      error: err.message,
    });
  }
};

// Send Payment Success Email
exports.sendPaymentSuccessEmail = async (req, res) => {
  try {
    const { bookingId, txnId } = req.body;
    const userId = req.user.id;

    // Fetch booking and user details
    const booking = await Booking.findById(bookingId).populate("userId");
    const user = booking?.userId;

    if (!booking || !user || user._id.toString() !== userId) {
      return res.status(404).json({
        success: false,
        message: "Booking not found or user not authorized",
      });
    }

    // Send payment success email
    await mailSender(
      user.email,
      "Payment Successful - Movie Booking",
      `Dear ${user.userName},\n\nYour payment of ₹${booking.totalAmount} has been successfully processed for the booking (Txn ID: ${txnId}). Enjoy your show!\n\nThank you for choosing our service!`
    );

    return res.status(200).json({
      success: true,
      message: "Payment success email sent",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error sending payment success email",
      error: err.message,
    });
  }
};
