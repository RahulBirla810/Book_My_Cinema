const express = require("express");
const router = express.Router();

const { fetchAllTickets, cancelTicket } = require("../controllers/Booking");
const { auth, isViewer } = require("../middlewares/auth");

router.get("/fetchBookings", auth, isViewer, fetchAllTickets);
router.post("/cancelBooking", auth, isViewer, cancelTicket);

module.exports = router;
