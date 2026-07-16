const QRCode = require("qrcode");
const User = require("../models/User");
const Booking = require("../models/Booking");

exports.bookShow = async (req, res) => {
  try {
    const userId = req.user.id;
    const { showId, seatsForBook, totalAmount } = req.body;

    const MovieShow = require("../models/MovieShow");
    const show = await MovieShow.findById(showId);
    const showDate = show ? show.showStart : null;

    // Step 1: Create the booking
    const newBooking = await Booking.create({
      showId: showId,
      bookedSeats: seatsForBook,
      status: "BOOKED",
      bookingStatus: "Booked",
      showDate: showDate,
      bookingDate: new Date(),
      totalAmount: totalAmount,
      userId: userId,
    });

    if (!newBooking) {
      return res.status(401).json({
        success: false,
        message: "Error while Booking",
      });
    }

    // Step 2: Generate QR code with the booking ID
    const qrCodeData = `Booking ID: ${newBooking._id}`;
    const qrCodeSrc = await QRCode.toDataURL(qrCodeData);

    // Step 3: Update the booking entry with the QR code
    newBooking.qrImage = qrCodeSrc;
    await newBooking.save();

    // Step 4: Update the user's booking list
    const updateUser = await User.findByIdAndUpdate(
      userId,
      {
        $push: { booking: newBooking._id },
      },
      { new: true }
    );

    if (!updateUser) {
      return res.status(401).json({
        success: false,
        message: "User Booking is Not updated",
      });
    }

    // Return success response
    return res.status(200).json({
      success: true,
      bookingId: newBooking._id,
      qrCode: qrCodeSrc,
      message: "Booking confirmed",
    });
  } catch (error) {
    console.log("Something went wrong while booking show");
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Something went wrong while booking show",
    });
  }
};

exports.fetchAllTickets = async (req, res) => {
  try {
    const userId = req.user.id;
    const findUser = await User.findById(userId).populate({
      path: "booking",
      populate: [
        {
          path: "showId", // Populate showId
          select: "-showSeats", // Exclude showSeats
          populate: [
            {
              path: "cinemaId", // Populate cinemaId inside showId
              populate: {
                path: "cityId", // Populate cityId inside cinemaId
              },
            },
            {
              path: "movieId", // Populate movieId inside showId
            },
            {
              path: "screenId", // Populate screenId inside showId
            },
          ],
        },
        {
          path: "bookedSeats", // Populate bookedSeats
          populate: {
            path: "seatId", // Populate seatId inside bookedSeats
          },
        },
      ],
    });

    if (!findUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Return the refined response
    return res.status(200).json({
      success: true,
      bookings: findUser.booking,
      message: "Bookings fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while Feching Tickets",
    });
  }
};

exports.cancelTicket = async (req, res) => {
  try {
    const userId = req.user.id;
    const { bookingId, reason } = req.body;

    if (!bookingId) {
      return res.status(400).json({
        success: false,
        message: "Booking ID is required",
      });
    }

    const booking = await Booking.findById(bookingId).populate("showId");
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Authorization check
    if (booking.userId.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to cancel this booking",
      });
    }

    // Validation: prevent duplicate cancellation
    if (booking.bookingStatus === "Cancelled" || booking.status === "CANCELLED") {
      return res.status(400).json({
        success: false,
        message: "Ticket is already cancelled",
      });
    }

    // Validation: prevent cancellation after the show starts
    const now = new Date();
    const showStart = new Date(booking.showId.showStart);
    if (now >= showStart) {
      return res.status(400).json({
        success: false,
        message: "Cancellation Closed: Show has already started or completed",
      });
    }

    // Update booking status
    booking.status = "CANCELLED";
    booking.bookingStatus = "Cancelled";
    booking.cancelledAt = now;
    if (reason) {
      booking.cancellationReason = reason;
    }
    await booking.save();

    // Release all booked seats so they become available again
    const ShowSeat = require("../models/ShowSeat");
    if (booking.bookedSeats && booking.bookedSeats.length > 0) {
      await ShowSeat.updateMany(
        { _id: { $in: booking.bookedSeats } },
        { $set: { status: "Available" } }
      );
    }

    return res.status(200).json({
      success: true,
      message: "Ticket cancelled successfully and seats released",
      booking,
    });
  } catch (error) {
    console.error("Error cancelling ticket:", error);
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Something went wrong while cancelling ticket",
    });
  }
};
